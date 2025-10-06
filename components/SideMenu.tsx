import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");
const DRAWER_W = Math.min(360, Math.floor(width * 0.68));

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const SideMenu: React.FC<Props> = ({ visible, onClose, onLogout }) => {
  const slideX = useRef(new Animated.Value(-DRAWER_W)).current;

  const { userInfo, medInsurance } = useUser();

  useEffect(() => {
    Animated.timing(slideX, {
      toValue: visible ? 0 : -DRAWER_W,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

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
        {icon}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            borderBottomColor: "#28B9F0",
            borderBottomWidth: 1,
            paddingBottom: 8,
          }}
        >
          <Text style={styles.itemText}>{text}</Text>

          <AntDesign
            name="arrow-right"
            size={24}
            color="#04B0FE"
            style={{ opacity: 0.9 }}
          />
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
        style={[styles.drawerWrap, { transform: [{ translateX: slideX }] }]}
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
                  <Image
                    source={require("@/assets/images/icon/avatar-male.png")}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
              </View>
              <Text style={styles.name}>{userInfo?.ten}</Text>
              <Text style={styles.phone}>{userInfo?.masoBHXH}</Text>
            </View>

            {/* Divider */}
            <View style={styles.hr} />
            <View style={{ flex: 1 }}>
              {renderItemMenu({
                text: "Thông báo",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-speaker.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Tin tức",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-new.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Quản lý cá nhân",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-setting.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Dịch vụ công",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-list.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Trợ giúp",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-global.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Tra cứu",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-support.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              {renderItemMenu({
                text: "Cài đặt",
                icon: (
                  <Image
                    source={require("@/assets/images/icon/icon-st.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                ),
                onPress: () => {},
              })}
              <View style={{ justifyContent: "space-between", marginTop: 20 }}>
                {renderItemMenu({
                  text: "Đổi mật khẩu",
                  icon: (
                    <Image
                      source={require("@/assets/images/icon/icon-lock.png")}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                      }}
                    />
                  ),
                  onPress: () => {},
                })}
                {renderItemMenu({
                  text: "Đăng xuất",
                  icon: (
                    <Image
                      source={require("@/assets/images/icon/icon-logout.png")}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                      }}
                    />
                  ),
                  onPress: onLogout,
                })}

                {/* Footer small line (optional) */}
              </View>
            </View>
            {/* Only one menu item: Đăng xuất */}

            <View style={styles.footerWrap}>
              <Text style={styles.footer}>Phiên bản 2.6</Text>
              <Text style={styles.footer}>
                © Bản quyền thuộc về Bảo hiểm xã hội Việt Nam.
              </Text>
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
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    paddingBottom: 18,
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
    fontWeight: "700",
    fontSize: 16,
    marginTop: 10,
  },
  phone: {
    color: "white",
    opacity: 0.9,
    marginTop: 2,
    fontSize: 13,
  },
  hr: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginVertical: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  itemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
  },
  footer: {
    color: "#FFFFFF",
    fontSize: 14,
    bottom: 10,
    marginBottom: 10,
  },
  footerWrap: {
    paddingVertical: 12,
    alignItems: "flex-start",
  },
});
