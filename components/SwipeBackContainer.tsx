import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import { clearTranslateX, setTranslateX } from "@/store/slices/swipeBackSlice";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type SwipeBackContainerProps = {
  children: React.ReactNode;
  /** Header render cùng khối bị đẩy theo SideMenu (không bị vuốt-back translateX) */
  header?: React.ReactNode;
  /** Footer (VD BottomMenuBar) render cùng khối bị đẩy theo SideMenu */
  footer?: React.ReactNode;
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
  header,
  footer,
  backScreen,
  onBack,
  onLogout,
  enabled = true,
  overlayColor = "#000",
  style,
}: SwipeBackContainerProps) => {
  const router: any = useRouter();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const menuTranslateX = React.useRef(new Animated.Value(-DRAWER_W)).current;
  // Đẩy nội dung màn hình sang phải theo mép phải của SideMenu khi mở
  const menuPushX = menuTranslateX.interpolate({
    inputRange: [-DRAWER_W, 0],
    outputRange: [0, DRAWER_W],
  });

  const handleBack = React.useCallback(() => {
    // Không clearTranslateX() ở đây: làm vậy sẽ snap header về trạng thái
    // "hiện tại" (opacity 1) ngay khi vừa crossfade xong sang backTitle/backIcon,
    // trước khi màn hình thật sự bị unmount — gây hiệu ứng header nhảy ngược/ẩn
    // mất đúng lúc vừa vuốt xong. Cleanup ở useEffect (khi component unmount,
    // tức lúc điều hướng thật sự xảy ra) đã tự lo việc reset store.
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

  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Animated values cho swipe back
  const translateX = React.useRef(new Animated.Value(0)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  const startX = React.useRef(0);

  // Hiệu ứng "slide_from_left": trang phía sau (backScreen) trượt nhẹ từ trái vào đúng vị trí
  // khi được lộ ra, thay vì đứng yên tuyệt đối — giống parallax của Stack native.
  const BACK_SCREEN_PARALLAX_RATIO = 0.3;
  const backScreenTranslateX = translateX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [-SCREEN_WIDTH * BACK_SCREEN_PARALLAX_RATIO, 0],
    extrapolate: "clamp",
  });

  // Set translateX to store when component mounts, clear when unmounts
  React.useEffect(() => {
    dispatch(setTranslateX(translateX));
    return () => {
      dispatch(clearTranslateX());
    };
  }, [translateX]);

  // State cho swipe menu
  const menuPan = React.useRef(new Animated.Value(0)).current;
  const longPressTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = React.useRef(false);
  const pressStartTime = React.useRef(0);

  const EDGE_WIDTH = 20;

  // Đo chiều cao thực tế của header/footer để tính ranh giới nửa-trên/nửa-dưới
  // dựa trên vùng NỘI DUNG thực sự vuốt được, thay vì SCREEN_HEIGHT / 2 (không
  // tính header) — đây chính là nguyên nhân gây hiệu ứng "xé đôi" màn hình khi
  // vuốt ở vị trí trực quan là "nửa dưới" nhưng vẫn rơi vào vùng pageY < nửa
  // màn hình vật lý.
  const headerHeightRef = React.useRef(0);
  const footerHeightRef = React.useRef(0);

  const getBoundaryY = React.useCallback(() => {
    const usableHeight =
      SCREEN_HEIGHT - headerHeightRef.current - footerHeightRef.current;
    return headerHeightRef.current + usableHeight / 2;
  }, []);

  // Zone được QUYẾT ĐỊNH DUY NHẤT MỘT LẦN tại onPanResponderGrant và tái sử dụng
  // xuyên suốt move/release/terminate — tránh việc mỗi callback tự so sánh lại
  // y0 với ranh giới (có thể lệch nhau) khiến 2 nhánh xử lý cùng chạy và xung đột.
  const activeZone = React.useRef<"back" | "menu" | null>(null);

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
        const y = evt.nativeEvent.pageY;
        const boundary = getBoundaryY();

        // Chỉ bắt gesture từ mép trái
        if (evt.nativeEvent.pageX > EDGE_WIDTH) return false;
        // Nửa trên (dưới header): swipe back
        if (y < boundary && enabled && backScreen && !menuVisible) {
          return true;
        }

        // Nửa dưới: swipe menu — CHỈ khai báo có thể nhận gesture, không set
        // state ở đây (should-set là hàm truy vấn thuần, có thể bị gọi cho cả
        // những chạm không bao giờ trở thành gesture thật, ví dụ tap/scroll dọc)
        if (y >= boundary) {
          return true;
        }

        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const x0 = gestureState.x0 ?? evt.nativeEvent.pageX;
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        const boundary = getBoundaryY();

        // Chỉ bắt gesture từ mép trái
        if (x0 > EDGE_WIDTH) return false;

        const isHorizontal =
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);

        if (!isHorizontal) return false;

        // Nửa trên: swipe back
        if (y0 < boundary && enabled && !menuVisible && gestureState.dx > 8) {
          return true;
        }

        // Nửa dưới: swipe menu
        if (y0 >= boundary && gestureState.dx > 0) {
          return true;
        }

        return false;
      },

      onPanResponderGrant: (evt, gestureState) => {
        const x0 = gestureState.x0 ?? evt.nativeEvent.pageX;
        const y0 = gestureState.y0 ?? evt.nativeEvent.pageY;
        const boundary = getBoundaryY();

        // Chốt chặn dự phòng: dù Start/Move đã lọc theo EDGE_WIDTH, vẫn kiểm
        // tra lại x0 ở đây trước khi kích hoạt bất kỳ zone nào. GestureHandlerRootView
        // (bọc toàn app) đôi khi khiến PanResponder cổ điển nhận Grant cho gesture
        // mà điều kiện mép ban đầu không thật sự thoả — nếu không chặn lại, sidemenu
        // có thể mở dù vuốt xa mép trái.
        if (x0 > EDGE_WIDTH) {
          activeZone.current = null;
          return;
        }

        // Quyết định zone DUY NHẤT một lần tại đây — move/release/terminate
        // phía sau chỉ đọc lại activeZone.current, không so sánh y0 lần nữa,
        // nên 2 nhánh xử lý không bao giờ chạy chồng lên nhau giữa chừng.
        if (y0 < boundary && enabled && !menuVisible) {
          activeZone.current = "back";
          // Swipe back logic
          translateX.stopAnimation((v: number) => {
            startX.current = v;
            translateX.setOffset(v);
            translateX.setValue(0);
          });
        } else if (y0 >= boundary) {
          activeZone.current = "menu";
          // Swipe menu logic - bắt đầu ngay lập tức
          setMenuVisible(true);
          pressStartTime.current = Date.now();
          isLongPressActive.current = true;
          clearLongPress();
        } else {
          activeZone.current = null;
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        if (activeZone.current === "back") {
          // Swipe back move
          const gestureX = Math.max(0, gestureState.dx);
          translateX.setValue(gestureX);

          const total = Math.max(0, startX.current + gestureState.dx);
          const opacity = 0.4 * (1 - total / SCREEN_WIDTH);
          overlayOpacity.setValue(Math.max(0, Math.min(0.4, opacity)));
        } else if (activeZone.current === "menu" && isLongPressActive.current) {
          // Swipe menu move
          const dx = Math.max(0, gestureState.dx);
          menuPan.setValue(dx);

          const clampedDx = Math.min(dx, DRAWER_W);
          menuTranslateX.setValue(-DRAWER_W + clampedDx);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (activeZone.current === "back") {
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
        } else if (activeZone.current === "menu") {
          // Swipe menu release
          clearLongPress();
          const duration = Date.now() - pressStartTime.current;
          const isFastSwipeRight =
            duration < 600 && gestureState.vx > 0.5 && gestureState.dx > 50;

          if (!isLongPressActive.current && isFastSwipeRight) {
            menuPan.setValue(0);
            activeZone.current = null;
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

        activeZone.current = null;
      },

      onPanResponderTerminate: () => {
        clearLongPress();

        if (activeZone.current === "back") {
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
        } else if (activeZone.current === "menu") {
          menuPan.setValue(0);
        }

        activeZone.current = null;
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
    <View style={[{ flex: 1}, style]}>
        {/* Đẩy CẢ TRANG (header + nội dung) sang phải theo mép phải SideMenu khi mở */}
        <Animated.View style={{ flex: 1, transform: [{ translateX: menuPushX }] }}>
          <View
            onLayout={(e) => {
              headerHeightRef.current = e.nativeEvent.layout.height;
            }}
          >
            {header}
          </View>
          <View style={{ flex: 1 }}>
            {/* BACK SCREEN — PHẢI absolute, trượt nhẹ (parallax) theo tiến độ vuốt-back */}
            {backScreen && enabled && (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    zIndex: 0,
                    transform: [{ translateX: backScreenTranslateX }],
                  },
                ]}
              >
                {renderBackScreen()}
              </Animated.View>
            )}

            {/* CURRENT SCREEN — nằm trên cùng, chỉ translateX theo vuốt-back (header không bị ảnh hưởng) */}
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
                {...(enabled ? wrapperPanResponder.panHandlers : {})}
              >
                {children}
              </Animated.View>
            </Animated.View>
          </View>
          <View
            onLayout={(e) => {
              footerHeightRef.current = e.nativeEvent.layout.height;
            }}
          >
            {footer}
          </View>
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
