import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const DRAWER_W = Math.min(360, Math.floor(width * 0.78));

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: {
    name: string;
    phone: string;
    avatar: any; // require('...') or { uri: '...' }
  };
};

const SideMenu: React.FC<Props> = ({ visible, onClose, onLogout, user }) => {
  const slideX = useRef(new Animated.Value(-DRAWER_W)).current;

  useEffect(() => {
    Animated.timing(slideX, {
      toValue: visible ? 0 : -DRAWER_W,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

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
          colors={["#0DA5E7", "#0593DB", "#007EC8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.drawer}
        >
          <SafeAreaView>
            {/* Header: avatar + name + phone */}
            <View style={styles.header}>
              <View style={styles.avatarRing}>
                <AntDesign name="user" size={40} color="white" />
              </View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>

            {/* Divider */}
            <View style={styles.hr} />

            {/* Only one menu item: Đăng xuất */}
            <View style={{ justifyContent: "space-between" }}>
              <TouchableOpacity
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={onLogout}
              >
                <FontAwesome
                  name="power-off"
                  size={24}
                  color="white"
                  style={{ marginRight: 10, opacity: 0.9 }}
                />

                <Text style={styles.itemText}>Đăng xuất</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="white"
                  style={{ marginLeft: "auto", opacity: 0.9 }}
                />
              </TouchableOpacity>

              {/* Footer small line (optional) */}
              {/* <Text style={styles.footer}>Phiên bản 2.5</Text> */}
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
    paddingTop: 50,
    paddingBottom: 18,
  },
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
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
    paddingVertical: 14,
  },
  itemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    bottom: 10,
    left: 16,
  },
});
