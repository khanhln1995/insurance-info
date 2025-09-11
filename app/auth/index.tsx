import Input from "@/components/Input";
import RoundAvatar from "@/components/RoundAvatar";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const HEADER_HEIGHT = 400;
const { width, height } = Dimensions.get("window");
const LoginScreen = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <View></View>
        <TouchableOpacity
          onLongPress={() => {
            console.log("Pressed");
            router.push("/auth/datainput");
          }}
        >
          <AntDesign name="setting" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../../assets/images/header-auth.png")} // <-- put your image here
        resizeMode="cover"
        style={styles.headerBg}
        imageStyle={styles.headerBgImg}
      >
        <RoundAvatar
          size={width / 3}
          color="white"
          containerStyle={[
            {
              position: "absolute",
              top: HEADER_HEIGHT / 2,
              left: width / 2 - width / 3 / 2,
            },
          ]}
          uri={require("../../assets/images/logo.png")}
        />
      </ImageBackground>
      <View style={styles.content}>
        <Input
          iconLeft={<AntDesign name="user" size={24} color="white" />}
          placeholder="Tài khoản"
        />
        <Spacer size={20} />
        <Input
          iconLeft={<Entypo name="lock" size={24} color="white" />}
          secureTextEntry
          placeholder="Mật khẩu"
        />
        <Spacer size={30} />
        <View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
              onPress={() => {
                router.replace("/home");
              }}
            >
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  headerBg: {
    height: HEADER_HEIGHT,
    paddingTop: 10, // adjust if you use SafeArea
    justifyContent: "flex-end",
    width: "100%",
  },
  headerBgImg: {
    // Optional: soften the image/keep top-right blue strong
    // tintColor: undefined,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    // remove the old border line; image looks cleaner
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.border,
  },
});
