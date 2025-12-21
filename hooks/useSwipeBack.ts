import { useRef } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const EDGE_WIDTH = 20;

type UseSwipeBackParams = {
  onBack: () => void;
  enabled?: boolean;
};

export const useSwipeBack = ({
  onBack,
  enabled = true,
}: UseSwipeBackParams) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const startX = useRef(0);
  // startX stores the offset at gesture start; we'll use Animated.setOffset/flattenOffset
  const overlayOpacity = useRef(new Animated.Value(0.4)).current;
  const reset = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(overlayOpacity, {
        toValue: 0.4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        if (!enabled) return false;
        return evt.nativeEvent.pageX <= EDGE_WIDTH;
      },

      onMoveShouldSetPanResponder: (_, g) => {
        if (!enabled) return false;
        return (
          g.dx > 8 &&
          Math.abs(g.dx) > Math.abs(g.dy)
        );
      },

      onPanResponderGrant: () => {
        translateX.stopAnimation((v: number) => {
          startX.current = v;
          translateX.setOffset(v);
          translateX.setValue(0);
        });
      },

      onPanResponderMove: (_, g) => {
        const gestureX = Math.max(0, g.dx);
        // value + offset will be applied; setValue only with gesture delta
        translateX.setValue(gestureX);
        
        // overlay real-time from total translation (offset + gesture)
        const total = Math.max(0, startX.current + g.dx);
        const opacity = 0.4 * (1 - total / SCREEN_WIDTH);
        overlayOpacity.setValue(Math.max(0, Math.min(0.4, opacity)));
      },

      onPanResponderRelease: (_, g) => {
        // flatten offset so animations run on absolute value
        translateX.flattenOffset();
        translateX.stopAnimation((v: number) => {
          const currentX = Math.max(0, v);
          const shouldBack = currentX > SCREEN_WIDTH * 0.25 || g.vx > 0.6;

          if (shouldBack) {
            Animated.parallel([
              Animated.timing(translateX, {
                toValue: SCREEN_WIDTH,
                duration: 180,
                useNativeDriver: true,
              }),
              Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
              }),
            ]).start(() => {
              onBack();
            });
          } else {
            Animated.parallel([
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }),
              Animated.spring(overlayOpacity, {
                toValue: 0.4,
                useNativeDriver: true,
              }),
            ]).start();
          }
        });
      },
    })
  ).current;

  return { translateX, overlayOpacity, panResponder };
};
