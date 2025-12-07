import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import IconGlobal from "@/assets/images/icon/icon-global.svg";
import IconList from "@/assets/images/icon/icon-list.svg";
import IconLock from "@/assets/images/icon/icon-lock.svg";
import IconLogout from "@/assets/images/icon/icon-logout.svg";
import IconNew from "@/assets/images/icon/icon-new.svg";
import IconSetting from "@/assets/images/icon/icon-setting.svg";
import IconSpeaker from "@/assets/images/icon/icon-speaker.svg";
import IconSt from "@/assets/images/icon/icon-st.svg";
import IconSupport from "@/assets/images/icon/icon-support.svg";
import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import AntDesign from "@expo/vector-icons/AntDesign";
import Spacer from "./Spacer";

const { width } = Dimensions.get("window");
export const DRAWER_W = Math.min(360, Math.floor(width * 0.68));

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  translateX?: Animated.Value;
};

const SideMenu: React.FC<Props> = ({
  visible,
  onClose,
  onLogout,
  translateX,
}) => {
  const slideX = useRef(new Animated.Value(-DRAWER_W)).current;
  const startTranslateX = useRef(0);
  const MENU_EDGE_WIDTH = 30; 
  const { userInfo, avatar } = useUser();

  // Nếu không có translateX bên ngoài thì giữ behavior cũ: tự animate theo visible
  useEffect(() => {
    if (translateX !== undefined && translateX != null) return;
    Animated.timing(slideX, {
      toValue: visible ? 0 : -DRAWER_W,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, translateX]);

  const animatedX = translateX ?? slideX;

  // PanResponder để kéo menu từ mép phải khi menu mở
  const menuPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        const x = evt.nativeEvent.pageX;
        return x >= DRAWER_W - MENU_EDGE_WIDTH && x <= DRAWER_W;
      },
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        
        if (!visible || translateX == null || translateX === undefined) return false;
        const x0 = gestureState.x0 ?? _evt.nativeEvent.pageX;
        const isFromRightEdge = x0 >= DRAWER_W - MENU_EDGE_WIDTH && x0 <= DRAWER_W;
        const isHorizontal =
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        return isFromRightEdge && isHorizontal;
      },
      onPanResponderGrant: () => {
        if (translateX !== undefined && translateX != null) {
          startTranslateX.current = (translateX as any)._value || 0;
        }
      },
      onPanResponderMove: (_evt, gestureState) => {
        if (translateX !== undefined && translateX != null) {
          // Tính toán vị trí mới: dx < 0 = kéo trái (đóng), dx > 0 = kéo phải (mở thêm)
          const newX = Math.max(-DRAWER_W, Math.min(0, startTranslateX.current + gestureState.dx));
          translateX.setValue(newX);
        }
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (translateX === undefined || translateX == null) return;
        
        const currentValue = (translateX as any)._value || 0;
        
        if (currentValue < -DRAWER_W / 2 || gestureState.vx < -0.5) {
          Animated.spring(translateX, {
            toValue: -DRAWER_W,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const renderItemMenu = ({
    text,
    icon,
    onPress,
  }: {
    text: string;
    icon: any;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={styles.itemRow}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={{
          width: 36.17,
          alignItems: "center",
        }}>{icon}</View>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            borderBottomColor: "#28B9F0",
            borderBottomWidth: 1,
            paddingBottom: 13,
            // height: 38.45
          }}
        >
          <AppText variant="labelBold" style={styles.itemText}>
            {text}
          </AppText>

          {
            !['Đổi mật khẩu', 'Đăng xuất'].includes(text) &&
            <AntDesign
              name="arrow-right"
              size={17.41}
              color="#46B9FA"
              style={{ opacity: 0.9,  paddingRight: 21.77,}}
            />
          }
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      {/* Backdrop: press outside to close */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Drawer */}
      <Animated.View
        {...(visible && translateX ? menuPanResponder.panHandlers : {})}
        style={[styles.drawerWrap, { transform: [{ translateX: animatedX }] }]}
      >
        <LinearGradient
          colors={["#0D71C7", "#01AAED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.drawer}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Header: avatar + name + phone */}
            <View style={styles.header}>
              <View style={styles.avatarRing}>
                <View
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    backgroundColor: "white",
                  }}
                >
                  {avatar?.uri ? (
                    <Image
                      source={{ uri: avatar?.uri }}
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/icon/avatar-male.png")}
                      style={{ width: 50, height: 50 }}
                    />
                  )}
                </View>
              </View>
              <AppText variant="bodyBold" style={styles.name}>
                {userInfo?.ten}
              </AppText>
              <Spacer size={8.82} />
              <AppText variant="bodyBold" style={styles.phone}>
                {userInfo?.masoBHXH}
              </AppText>
            </View>

            {/* Divider */}
            <View style={styles.hr} />
            <View style={{ flex: 1 }}>
              {renderItemMenu({
                text: "Thông báo",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-speaker.png")}
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconSpeaker width={18.42} height={18.13} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Tin tức",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-new.png")}
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconNew width={19.76} height={16.64} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Quản lý cá nhân",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-setting.png")}
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconSetting width={19.36} height={19.43} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Dịch vụ công",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-list.png")}
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconList width={13.39} height={17.35} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Tra cứu",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-global.png")}
                
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconGlobal width={16.74} height={17.48} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Trợ giúp",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-support.png")}
                  //   style={{    
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconSupport width={18.26} height={18.75} />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Cài đặt",
                icon: (
                  // <Image
                  //   source={require("@/assets/images/icon/icon-st.png")}
                  //   style={{
                  //     width: 24,
                  //     height: 24,
                  //     marginRight: 10,
                  //   }}
                  // />
                  <IconSt width={19.62} height={19.76} />
                ),
                onPress: () => {},
              })}
              <View style={{ justifyContent: "space-between", marginTop: 60 }}>
                {renderItemMenu({
                  text: "Đổi mật khẩu",
                  icon: (
                    // <Image
                    //   source={require("@/assets/images/icon/icon-lock.png")}
                    //   style={{

                    //     width: 24,
                    //     height: 24,
                    //     marginRight: 10,
                    //   }}
                    // />
                    <IconLock width={15.4} height={19.17} />
                  ),
                  onPress: () => {},
                })}
                {renderItemMenu({
                  text: "Đăng xuất",
                  icon: (
                    // <Image
                    //   source={require("@/assets/images/icon/icon-logout.png")}

                    //   style={{
                    //     width: 24,
                    //     height: 24,
                    //     marginRight: 10,
                    //   }}
                    // />
                    <IconLogout width={17.02} height={17.02} />
                  ),
                  onPress: onLogout,
                })}

                {/* Footer small line (optional) */}
              </View>
            </View>
            {/* Only one menu item: Đăng xuất */}

            <View style={styles.footerWrap}>
              <AppText variant="label" style={styles.footer}>
                Phiên bản 2.6
              </AppText>
              <AppText variant="label" style={styles.footer}>
                © Bản quyền thuộc về Bảo hiểm xã hội Việt Nam.
              </AppText>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  drawerWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_W,
  },
  drawer: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
  },
  avatarRing: {
    width: 60,
    height: 60,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: "white",
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 999,
  },
  name: {
    color: "white",
    marginTop: 10,
  },
  phone: {
    color: "white",
    opacity: 0.9,
    marginTop: 2,
  },
  hr: {
    height: 4.5,
    marginTop: 13.26,
    marginBottom: 10.26,
    backgroundColor: "#00000010",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    height: 38.45,
    paddingLeft: 6,
    marginTop: 9.5
  },
  itemText: {
    color: "white",
  },
  footer: {
    color: "#FFFFFF",
    bottom: 10,
    marginBottom: 10,
  },
  footerWrap: {
    // paddingVertical: 12,
    paddingHorizontal: 10.04,
  },
});
