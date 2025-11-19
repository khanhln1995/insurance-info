import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import SafeArea from "@/components/SafeArea";
import SideMenu from "@/components/SideMenu";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "@/components/AppText";
const Home = () => {
  const [visible, setVisible] = React.useState(false);
  const router: any = useRouter();
  const RenderSelect = ({
    text,
    source,
    route,
    isTop = true,
    isBottom = true,
  }: {
    text?: string;
    source?: any;
    route?: string;
    isTop?: boolean;
    isBottom?: boolean;
  }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            width: 39.69,
            height: 39.69,
            padding: 10,
            borderWidth: 2,
            borderColor: Colors.primary,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={source} style={{ width: 30, height: 30 }} />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            if (route) {
              router.push(route);
            }
          }}
        >
          <View
            style={{
              flex: 1, 
              borderTopWidth: isTop ? 1 : 0,
              borderBottomWidth: isBottom ? 1 : 0,
              borderBottomColor: '#7E7E7E',
              borderTopColor: '#7E7E7E',
              paddingVertical: 20,
              marginRight: 8, 
            }}
          >
            <AppText
              variant="headingMdRegular"
              numberOfLines={1}
              style={{ color: Colors.txtSecondary }}
            >
              {text}
            </AppText>
          </View>

          <Entypo
            name="chevron-right"
            size={20}
            color={Colors.txtDark}
            style={{ flexShrink: 0 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeArea>
      <HeaderBack
        title="QUẢN LÝ CÁ NHÂN"
        titleVariant="headingMdRegular"
        iconLeft={<Ionicons name="menu" size={33.33} color="white" />}
        textColor="white"
        onGoBack={() => {
          setVisible(true);
        }}
        styleContainer={{ padding: 2 }}
      />
      <View style={{ justifyContent: "space-between", alignSelf: "center", flex: 1, width: 395 }}>
        <View style={{ padding: 17.41 }}>
          <InfoCard type="user" />
          <Spacer size={26.46} />
          <RenderSelect
            text="THẺ BHYT"
            source={require("@/assets/images/icon/card.png")}
            route="/home/medinsurance"
            isTop={false}
            isBottom={false}
          />

          <RenderSelect
            text="QUÁ TRÌNH THAM GIA"
            source={require("@/assets/images/icon/time.png")}
            route="/home/progress"
            isBottom={false}
          />

          <RenderSelect
            text="THÔNG TIN HƯỞNG"
            source={require("@/assets/images/icon/user-info.png")}
            isBottom={false}
          />

          <RenderSelect
            text="SỔ KHÁM CHỮA BỆNH"
            source={require("@/assets/images/icon/med-plus.png")}
          />
        </View>
        <BottomMenuBar />
      </View>

      <SideMenu
        visible={visible}
        onClose={() => setVisible(false)}
        onLogout={() => {
          router.replace("/auth");
        }}
      />
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
});
