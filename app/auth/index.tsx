import FaceId from "@/assets/images/icon/face-id.svg";
import GlobalSearch from "@/assets/images/icon/global-search.svg";
import Help from "@/assets/images/icon/help.svg";
import Location from "@/assets/images/icon/location.svg";
import Sheet from "@/assets/images/icon/sheet.svg";
import Tivi from "@/assets/images/icon/tivi.svg";
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
            style={{ width: 20.09, height: 23.11 }}
            resizeMode="contain"
          />
          <TouchableOpacity
            onLongPress={() => {
              router.push("/auth/datainput");
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require("../../assets/images/vn-flag.png")}
              style={{ width: 32.15, height: 19.42 }}
            />
          </TouchableOpacity>
        </View>
        <Spacer size={60} />
        <RoundAvatar
          size={99.5}
          color="white"
          containerStyle={[
            {
              alignSelf: "center",
              // boxShadow
              boxShadow: '#00000029'
            },
          ]}
          uri={require("../../assets/images/icon/logo.png")}
        />
        <Spacer size={27} />

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
              <FaceId width={40.69} height={41.02} />
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
              <Sheet width={34.92} height={23.33} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Help width={23.44} height={22.57} />
            </TouchableOpacity>
            <TouchableOpacity>
              <GlobalSearch width={23.16} height={24.11} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Tivi width={27.8} height={22.67} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Location width={26.79} height={26.79} />
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
    paddingTop: 48,
    // paddingBottom: 37,
    paddingLeft: 17.75,
    paddingRight: 11.33,
    zIndex: 100,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 29,
    alignSelf: "center",
  },
  button: {
    borderWidth: 1.76,
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
