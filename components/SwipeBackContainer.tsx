import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, ViewStyle } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const HALF_SCREEN = SCREEN_HEIGHT / 2;

type SwipeBackContainerProps = {
  children: React.ReactNode;
  /** Component hoặc ReactNode render màn hình phía sau (back screen) */
  backScreen?: React.ComponentType<any> | React.ReactNode;
  /** Callback khi swipe back thành công. Nếu không truyền, sẽ tự động dùng router.back() */
  onBack?: () => void;
  /** Callback khi logout */
  onLogout?: () => void;
  /** Enable/disable swipe back gesture. Mặc định là true */
  enabled?: boolean;
  /** Overlay background color. Mặc định là "#000" */
  overlayColor?: string;
  /** Style cho container */
  style?: ViewStyle;
};

const SwipeBackContainer = ({
  children,
  backScreen,
  onBack,
  onLogout,
  enabled = true,
  overlayColor = "#000",
  style,
}: SwipeBackContainerProps) => {
  const router: any = useRouter();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const menuTranslateX = React.useRef(new Animated.Value(-DRAWER_W)).current;

  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  }, [onBack, router]);

  const handleLogout = React.useCallback(() => {
    if (onLogout) {
      onLogout();
    } else {
      router.replace("/auth");
    }
  }, [onLogout, router]);

  const closeMenu = React.useCallback(() => {
    Animated.spring(menuTranslateX, {
      toValue: -DRAWER_W,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  }, [menuTranslateX]);

  // Animated values cho swipe back
  const translateX = React.useRef(new Animated.Value(0)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  const startX = React.useRef(0);

  // State cho swipe menu
  const menuPan = React.useRef(new Animated.Value(0)).current;
  const longPressTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = React.useRef(false);
  const pressStartTime = React.useRef(0);

  const EDGE_WIDTH = 20;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const clearLongPress = React.useCallback(() => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  }, []);

  // Tạo pan responder wrapper để phân biệt nửa trên/nửa dưới
  const wrapperPanResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        const x = evt.nativeEvent.pageX;
        const y = evt.nativeEvent.pageY;
        
        // Chỉ bắt gesture từ mép trái
        //if (x > EDGE_WIDTH) return false;
        
        // Nửa trên: swipe back
        if (y < HALF_SCREEN && enabled && !menuVisible) {
          return true;
        }
        
        // Nửa dưới: swipe menu
        if (y >= HALF_SCREEN) {
          setMenuVisible(true);
          return true;
        }
        
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const x0 = gestureState.x0 ?? evt.nativeEvent.pageX;
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        
        // Chỉ bắt gesture từ mép trái
        if (x0 > EDGE_WIDTH) return false;
        
        const isHorizontal =
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        
        if (!isHorizontal) return false;
        
        // Nửa trên: swipe back
        if (y0 < HALF_SCREEN && enabled && !menuVisible && gestureState.dx > 8) {
          return true;
        }
        
        // Nửa dưới: swipe menu
        if (y0 >= HALF_SCREEN && gestureState.dx > 0) {
          return true;
        }
        
        return false;
      },

      onPanResponderGrant: (evt, gestureState) => {
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        
        if (y0 < HALF_SCREEN && enabled && !menuVisible) {
          // Swipe back logic
          translateX.stopAnimation((v: number) => {
            startX.current = v;
            translateX.setOffset(v);
            translateX.setValue(0);
          });
        } else if (y0 >= HALF_SCREEN) {
          // Swipe menu logic - bắt đầu ngay lập tức
          pressStartTime.current = Date.now();
          isLongPressActive.current = true;
          clearLongPress();
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        
        if (y0 < HALF_SCREEN && enabled && !menuVisible) {
          // Swipe back move
          const gestureX = Math.max(0, gestureState.dx);
          translateX.setValue(gestureX);
          
          const total = Math.max(0, startX.current + gestureState.dx);
          const opacity = 0.4 * (1 - total / SCREEN_WIDTH);
          overlayOpacity.setValue(Math.max(0, Math.min(0.4, opacity)));
        } else if (y0 >= HALF_SCREEN && isLongPressActive.current) {
          // Swipe menu move
          const dx = Math.max(0, gestureState.dx);
          menuPan.setValue(dx);
          
          const clampedDx = Math.min(dx, DRAWER_W);
          menuTranslateX.setValue(-DRAWER_W + clampedDx);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        
        if (y0 < HALF_SCREEN && enabled && !menuVisible) {
          // Swipe back release
          translateX.flattenOffset();
          translateX.stopAnimation((v: number) => {
            const currentX = Math.max(0, v);
            const shouldBack = currentX > SCREEN_WIDTH * 0.25 || gestureState.vx > 0.6;

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
                handleBack();
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
        } else if (y0 >= HALF_SCREEN) {
          // Swipe menu release
          clearLongPress();
          const duration = Date.now() - pressStartTime.current;
          const isFastSwipeRight =
            duration < 600 && gestureState.vx > 0.5 && gestureState.dx > 50;

          if (!isLongPressActive.current && isFastSwipeRight) {
            menuPan.setValue(0);
            return;
          }

          // Mở/đóng menu
          if (isLongPressActive.current && gestureState.dx > DRAWER_W / 3) {
            Animated.spring(menuTranslateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            setMenuVisible(true);
          } else {
            Animated.spring(menuTranslateX, {
              toValue: -DRAWER_W,
              useNativeDriver: true,
            }).start(() => {
              setMenuVisible(false);
            });
          }

          menuPan.setValue(0);
        }
      },

      onPanResponderTerminate: (evt, gestureState) => {
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        
        clearLongPress();
        
        if (y0 < HALF_SCREEN && enabled && !menuVisible) {
          translateX.flattenOffset();
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
        } else if (y0 >= HALF_SCREEN) {
          menuPan.setValue(0);
        }
      },
    })
  ).current;


  const renderBackScreen = () => {
    if (!backScreen) {
      return null;
    }

    // Nếu là ReactNode (JSX element, string, number, etc.)
    if (React.isValidElement(backScreen) || typeof backScreen !== "function") {
      return backScreen as React.ReactNode;
    }

    // Nếu là React Component (function component hoặc class component)
    const BackScreenComponent = backScreen as React.ComponentType<any>;
    return <BackScreenComponent />;
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      {/* BACK SCREEN — PHẢI absolute */}
      {backScreen && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              zIndex: 0,
            },
          ]}
        >
          {renderBackScreen()}
        </Animated.View>
      )}

      {/* OVERLAY — PHẢI absolute */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1,
          },
        ]}
      />

      {/* CURRENT SCREEN — nằm trên cùng */}
      <Animated.View
        style={{
          flex: 1,
          zIndex: 2,
          transform: [{ translateX }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
          }}
          {...wrapperPanResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </Animated.View>

      {/* SIDE MENU */}
      <SideMenu
        visible={menuVisible}
        translateX={menuTranslateX}
        onClose={closeMenu}
        onLogout={handleLogout}
      />
    </View>
  );
};

export default SwipeBackContainer;
