import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

type UseSwipeMenuParams = {
  onOpenMenu?: () => void;
  onSwipeBack?: () => void;
  longPressDurationMs?: number;
  menuTranslateX?: Animated.Value;
  menuWidth?: number;

  /** 👇 callback để TẮT gesture-back native */
  onStart?: () => void;

  onRequestMenuVisible?: (visible: boolean) => void;
};

const EDGE_WIDTH = 20;

export const useSwipeMenu = ({
  onOpenMenu,
  onSwipeBack,
  onStart,
  longPressDurationMs = 0,
  menuTranslateX,
  menuWidth,
  onRequestMenuVisible,
}: UseSwipeMenuParams) => {
  const pan = useRef(new Animated.Value(0)).current;

  const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = useRef(false);
  const pressStartTime = useRef(0);

  const resetPan = () => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const clearLongPress = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        const x = evt.nativeEvent.pageX;
        return x <= EDGE_WIDTH;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const x0 = gestureState.x0 ?? evt.nativeEvent.pageX;
        const isFromEdge = x0 <= EDGE_WIDTH;
        const isHorizontal =
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        return isFromEdge && isHorizontal && gestureState.dx > 0;
      },
      onPanResponderGrant: (_evt, gestureState) => {
        pressStartTime.current = Date.now();
        isLongPressActive.current = false;

        // 🔥 TẮT SWIPE-BACK IOS NGAY LẬP TỨC
        onStart?.();

        clearLongPress();
        longPressTimeout.current = setTimeout(() => {
          isLongPressActive.current = true;

          if (menuTranslateX && menuWidth) {
            onRequestMenuVisible?.(true);
          }
        }, longPressDurationMs);
      },

      /* =========================
       * MOVE
       * ========================= */
      onPanResponderMove: (_evt, gestureState) => {
        if (!isLongPressActive.current) return;

        const dx = Math.max(0, gestureState.dx);
        pan.setValue(dx);

        if (menuTranslateX && menuWidth) {
          const clampedDx = Math.min(dx, menuWidth);
          menuTranslateX.setValue(-menuWidth + clampedDx);
        }
      },
      onPanResponderRelease: (_evt, gestureState) => {
        clearLongPress();
        const duration = Date.now() - pressStartTime.current;

        const isFastSwipeRight =
          duration < 600 && gestureState.vx > 0.5 && gestureState.dx > 50;

        // 👉 swipe-back nhanh
        if (!isLongPressActive.current && isFastSwipeRight) {
          onSwipeBack?.();
          resetPan();
          return;
        }

        // 👉 mở menu
        if (isLongPressActive.current && gestureState.dx > menuWidth! / 3) {
          Animated.spring(menuTranslateX!, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          onRequestMenuVisible?.(true);
        } else {
          // 👉 đóng lại
          Animated.spring(menuTranslateX!, {
            toValue: -menuWidth!,
            useNativeDriver: true,
          }).start(() => {
            onRequestMenuVisible?.(false);
          });
        }

        resetPan();
      },

      onPanResponderTerminate: () => {
        clearLongPress();
        resetPan();
      },
    })
  ).current;

  return { panResponder, pan };
};
