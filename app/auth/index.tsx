import Input from "@/components/Input";
import RoundAvatar from "@/components/RoundAvatar";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height / 1.4;
const LoginScreen = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <ImageBackground
        source={require("../../assets/images/header-auth.png")} // <-- put your image here
        resizeMode="cover"
        style={styles.headerBg}
        imageStyle={styles.headerBgImg}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/bell.png")}
            width={30}
            height={30}
          />
          <TouchableOpacity
            onLongPress={() => {
              console.log("Pressed");
              router.push("/auth/datainput");
            }}
          >
            <Image
              source={require("../../assets/images/vn-flag.png")}
              width={30}
              height={30}
            />
          </TouchableOpacity>
        </View>

        <RoundAvatar
          size={width / 3}
          color="white"
          containerStyle={[
            {
              alignSelf: "center",
            },
          ]}
          uri={require("../../assets/images/logo.png")}
        />
        <Spacer size={20} />

        <View style={styles.content}>
          <View>
            <Input
              iconLeft={
                <View>
                  <Image
                    source={require("../../assets/images/icon/user.png")}
                    style={{ width: 18, height: 23 }}
                  />
                </View>
              }
              placeholder="Mã số BHXH/ Số ĐDCN/ CCCD"
            />
            <Spacer size={20} />
            <Input
              iconLeft={
                <View>
                  <Image
                    source={require("../../assets/images/icon/lock.png")}
                    style={{ width: 18, height: 23 }}
                  />
                </View>
              }
              secureTextEntry
              placeholder="Mật khẩu"
            />
          </View>
          <Spacer size={20} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: Colors.primary }}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: Colors.primary }}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>
          <Spacer size={20} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 20,
            }}
          >
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
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require("../../assets/images/icon/face-id.png")}
                style={{ width: 39, height: 39 }}
              />
            </TouchableOpacity>
          </View>
          <Spacer size={20} />

          <View
            style={{
              backgroundColor: "#DA1B13",
              padding: 5,
              width: "100%",
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
                textAlign: "center",
                flex: 1,
                fontSize: 16,
              }}
            >
              {"Đăng nhập bằng tài khoản\n định danh điện tử"}
            </Text>
            <Image
              source={require("../../assets/images/vneid.png")}
              style={{ width: 49, height: 52 }}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={{ padding: 20 }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={{ color: Colors.primary, textAlign: "center" }}>
            Mở cài đặt VssID
          </Text>
        </TouchableOpacity>
        <Spacer size={20} />
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={{ color: Colors.primary, textAlign: "right" }}>
            Chính sách quyền riêng tư
          </Text>
        </TouchableOpacity>
        <Spacer size={20} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/icon/list.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/icon/global-search.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/icon/support.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/icon/video.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/icon/location.png")}
              style={{ width: 24, height: 24 }}
            />
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
    paddingVertical: 50,
    paddingHorizontal: 15,
    zIndex: 100,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 39,
    flex: 1,
  },
  headerBg: {
    height: HEADER_HEIGHT,
    // paddingTop: 10, // adjust if you use SafeArea
    width: "100%",
  },
  headerBgImg: {
    // Optional: soften the image/keep top-right blue strong
    // tintColor: undefined,
  },
});
