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
  }: {
    text?: string;
    source?: any;
    route?: string;
  }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            width: 60,
            height: 60,
            padding: 10,
            borderWidth: 2,
            borderColor: Colors.primary,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={source} style={{ width: 40, height: 40 }} />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flex: 1, // ⬅️ take remaining space instead of width: "100%"
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push(route);
          }}
        >
          <View
            style={{
              flex: 1, // ⬅️ lets the border span the remaining row
              borderBottomWidth: 1,
              borderBottomColor: Colors.txtDark,
              paddingBottom: 10,
              marginRight: 8, // space before chevron
            }}
          >
            <Text numberOfLines={1} style={{ color: Colors.txtDark }}>
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
        iconLeft={<Ionicons name="menu" size={24} color="white" />}
        textColor="white"
        onGoBack={() => {
          setVisible(true);
        }}
      />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ padding: 20 }}>
          <InfoCard type="user" />
          <Spacer size={20} />
          <RenderSelect
            text="Thẻ BHYT"
            source={require("@/assets/images/icon/card.png")}
            route="/home/medinsurance"
          />
          <Spacer size={20} />

          <RenderSelect
            text="QUÁ TRÌNH THAM GIA"
            source={require("@/assets/images/icon/time.png")}
            route="/home/progress"
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
