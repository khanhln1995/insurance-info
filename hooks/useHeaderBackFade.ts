import { useMemo } from "react";
import { Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

/**
 * Hook để tính toán opacity cho header hiện tại và header back
 * dựa trên translateX từ SwipeBackContainer
 * Crossfade: cả 2 header hiển thị cùng lúc, một fade out, một fade in
 */
export const useHeaderBackFade = (translateX: Animated.Value | null) => {
  const { currentHeaderOpacity, backHeaderOpacity } = useMemo(() => {
    if (!translateX) {
      // Nếu không có translateX, trả về giá trị cố định
      return {
        currentHeaderOpacity: new Animated.Value(1),
        backHeaderOpacity: new Animated.Value(0),
      };
    }

    // Sử dụng interpolation để tính toán opacity dựa trên translateX
    // translateX: 0 -> SCREEN_WIDTH
    // currentHeaderOpacity: 1 -> 0 (fade out)
    // backHeaderOpacity: 0 -> 1 (fade in)
    // Cả 2 diễn ra đồng thời (crossfade)
    const currentHeaderOpacity = translateX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const backHeaderOpacity = translateX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return {
      currentHeaderOpacity,
      backHeaderOpacity,
    };
  }, [translateX]);

  return {
    currentHeaderOpacity,
    backHeaderOpacity,
  };
};

