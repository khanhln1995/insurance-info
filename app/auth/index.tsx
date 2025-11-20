import AppText from "@/components/AppText";
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
        source={require("../../assets/images/bg-auth.png")}
        resizeMode="cover"
        style={styles.headerBg}
        imageStyle={styles.headerBgImg}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/bell.png")}
            style={{ width: 30, height: 30 }}
          />
          <TouchableOpacity
            onLongPress={() => {
              router.push("/auth/datainput");
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require("../../assets/images/vn-flag.png")}
              style={{ width: 35, height: 35 }}
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
                    style={{ width: 18.87, height: 22.05 }}
                  />
                </View>
              }
              placeholder="Mã số BHXH/ Số ĐDCN/ CCCD"
            />
            <Spacer size={13.23} />
            <Input
              iconLeft={
                <View>
                  <Image
                    source={require("../../assets/images/icon/lock.png")}
                    style={{ width: 18.87, height: 22.05 }}
                  />
                </View>
              }
              secureTextEntry
              placeholder="Mật khẩu"
            />
          </View>
          <Spacer size={5.36} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity>
              <AppText
                variant="microBold"
                style={{ color: Colors.textPrimary }}
              >
                Quên mật khẩu ?
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity>
              <AppText
                variant="microBold"
                style={{ color: Colors.textPrimary }}
              >
                Đăng ký tài khoản
              </AppText>
            </TouchableOpacity>
          </View>
          <Spacer size={21.43} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 13.23,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => router.replace("/home")}
            >
              <AppText
                variant="textLoginBtn"
                style={{
                  color: Colors.primary,
                }}
              >
                Đăng Nhập
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require("../../assets/images/icon/face-id.png")}
                style={{ width: 40.69, height: 41.02 }}
              />
            </TouchableOpacity>
          </View>
          <Spacer size={17.64} />

          <View
            style={{
              backgroundColor: "#DA1B13",
              padding: 2.2,
              width: "100%",
              height: 61.74,
              borderRadius: 8.82,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AppText
              style={{
                color: "white",
                textAlign: "center",
                flex: 1,
                fontSize: 15.44,
                fontWeight: "500",
              }}
            >
              {"Đăng nhập bằng tài khoản\n định danh điện tử"}
            </AppText>
            <Image
              source={require("../../assets/images/vneid.png")}
              style={{ width: 54, height: 57.33 }}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={{ padding: 20 }}>
        <TouchableOpacity activeOpacity={0.7}>
          <AppText
            variant="body"
            style={{ color: Colors.primary, textAlign: "center" }}
          >
            Mở cài đặt VssID
          </AppText>
        </TouchableOpacity>
        <Spacer size={26.46} />
        <TouchableOpacity activeOpacity={0.7}>
          <AppText
            variant="body"
            style={{ color: Colors.primary, textAlign: "right" }}
          >
            Chính sách quyền riêng tư
          </AppText>
        </TouchableOpacity>
        <Spacer size={26.46} />
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
              gap: 23.44,
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
                source={require("../../assets/images/icon/support.png")}
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
    paddingVertical: 60,
    paddingHorizontal: 15,
    zIndex: 100,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
    width: 369.05,
    alignSelf: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 4.41,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    flex: 1,
    width: 315.13,
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
