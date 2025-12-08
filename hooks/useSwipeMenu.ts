import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

type UseSwipeMenuParams = {
  /**
   * Gọi khi người dùng NHẤN GIỮ 2–3s ở mép trái rồi kéo sang phải (vuốt chậm).
   * Thường dùng để mở SideMenu.
   */
  onOpenMenu?: () => void;
  /**
   * Gọi khi người dùng vuốt nhanh sang phải từ mép trái.
   * Thường dùng để quay lại màn trước (router.back()).
   */
  onSwipeBack?: () => void;
  /**
   * Thời gian nhấn giữ để được coi là long-press (ms).
   * Mặc định ~2s theo yêu cầu.
   */
  longPressDurationMs?: number;
  /**
   * Animated.Value điều khiển vị trí SideMenu (translateX),
   * để có thể kéo menu mở dần theo tay.
   */
  menuTranslateX?: Animated.Value;
  /**
   * Chiều rộng drawer (dùng để clamp giá trị kéo).
   */
  menuWidth?: number;
  onStart?: () => void;
  /**
   * Cho phép hook yêu cầu mở/đóng menu (điều khiển prop `visible` của SideMenu).
   */
  onRequestMenuVisible?: (visible: boolean) => void;
};

const EDGE_WIDTH = 20; // chỉ bắt gesture trong vùng mép trái

export const useSwipeMenu = ({
  onOpenMenu,
  onStart,
  onSwipeBack,
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
      onRequestMenuVisible && onRequestMenuVisible(false);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      // Chỉ bắt đầu gesture nếu chạm ở mép trái
      onStartShouldSetPanResponder: (evt) => {
        onStart?.();
        const x = evt.nativeEvent.pageX;
        return x <= EDGE_WIDTH;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const x0 = gestureState.x0 ?? evt.nativeEvent.pageX;
        const isFromEdge = x0 <= EDGE_WIDTH;
        const isHorizontal =
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        const isRight = gestureState.dx > 0;
        return isFromEdge && isHorizontal && isRight;
      },
      onPanResponderGrant: (_evt, gestureState) => {
        pressStartTime.current = Date.now();
        isLongPressActive.current = false;

        clearLongPress();
        longPressTimeout.current = setTimeout(() => {
          isLongPressActive.current = true;
          const dx = Math.max(0, gestureState.dx);
          pan.setValue(dx);
          if (menuTranslateX && menuWidth) {
            const clampedDx = Math.min(dx, menuWidth);
            const nextX = -menuWidth + clampedDx;
            menuTranslateX.setValue(nextX);
            onRequestMenuVisible && onRequestMenuVisible(true);
          }
        }, longPressDurationMs);
      },
      onPanResponderMove: (_evt, gestureState) => {
        if (isLongPressActive.current) {
          const dx = Math.max(0, gestureState.dx);
          pan.setValue(dx);
          if (menuTranslateX && menuWidth) {
            const clampedDx = Math.min(dx, menuWidth);
            const nextX = -menuWidth + clampedDx;
            menuTranslateX.setValue(nextX);
            onRequestMenuVisible && onRequestMenuVisible(true);
          }
        }
      },
      onPanResponderRelease: (_evt, gestureState) => {
        clearLongPress();
        const duration = Date.now() - pressStartTime.current;

        const isFastSwipeRight =
          duration < 600 && gestureState.vx > 0.5 && gestureState.dx > 50;

        if (!isLongPressActive.current && isFastSwipeRight && onSwipeBack) {
          onSwipeBack();
        } else if (isLongPressActive.current && gestureState.dx > 30) {
          // Long-press + kéo đủ xa => mở hẳn menu
          if (menuTranslateX && menuWidth) {
            onRequestMenuVisible && onRequestMenuVisible(true);
            Animated.spring(menuTranslateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          } else {
            onOpenMenu && onOpenMenu();
          }
        } else {
          // Thả ra mà không đủ điều kiện mở => đóng lại nếu đang kéo menu
          if (menuTranslateX && menuWidth) {
            Animated.spring(menuTranslateX, {
              toValue: -menuWidth,
              useNativeDriver: true,
            }).start(() => {
              onRequestMenuVisible && onRequestMenuVisible(false);
            });
          }
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
