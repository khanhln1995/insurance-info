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
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
            width: 45,
            height: 45,
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
            flex: 1, // ⬅️ take remaining space instead of width: "100%"
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
              flex: 1, // ⬅️ lets the border span the remaining row
              borderTopWidth: isTop ? 1 : 0,
              borderBottomWidth: isBottom ? 1 : 0,
              borderBottomColor: Colors.txtDark,
              paddingVertical: 25,
              marginRight: 8, // space before chevron
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: Colors.txtDark, fontSize: 16 }}
            >
              {text}
            </Text>
          </View>

          <Entypo
            name="chevron-right"
            size={24}
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
        textStyle={{ fontWeight: 400, fontSize: 20 }}
        iconLeft={<Ionicons name="menu" size={24} color="white" />}
        textColor="white"
        onGoBack={() => {
          setVisible(true);
        }}
        styleContainer={{ padding: 2 }}
      />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ padding: 20 }}>
          <InfoCard type="user" />
          <Spacer size={20} />
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
