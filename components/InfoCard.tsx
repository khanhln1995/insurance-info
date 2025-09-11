import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacer from "./Spacer";

interface Props {
  type: "user" | "insurance";
}

const InfoCard = ({ type }: Props) => {
  let subInfo: any;
  let contentCard: any;
  const RenderInfoLine = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingVertical: 8,
        }}
      >
        <Text style={{ color: Colors.border, flex: 1 }}>{title}</Text>
        <Text
          style={{
            color: Colors.border,
            flex: 2, // let value take remaining space
            textAlign: "right", // align to right if you want
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  switch (type) {
    case "user":
      subInfo = (
        <View>
          <Text style={styles.txtSubInfo}>Mã BHXH : </Text>
        </View>
      );
      contentCard = (
        <View>
          <RenderInfoLine title="Ngày sinh" value="01/01/2000" />
          <RenderInfoLine title="ĐDCN/CCCD/Hộ chiếu" value="123456789" />
          <RenderInfoLine title="Số điện thoại" value="091938293" />
          <RenderInfoLine
            title="Địa chỉ"
            value="Số 3 ngách 23 phường 5 quần 1 Thành phố Hồ Chí Minh"
          />
        </View>
      );
      break;
    case "insurance":
      subInfo = (
        <View>
          <Text style={styles.txtSubInfo}>Thời hạn có giá trị</Text>
          <Text></Text>
        </View>
      );
  }
  return (
    <View
      style={{ backgroundColor: Colors.bgInfo, padding: 15, borderRadius: 5 }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={{
            backgroundColor: Colors.primary,
            width: 50,
            height: 50,
            borderRadius: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="user" size={24} color="white" />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold" }}>Nguyễn Văn A</Text>
          {subInfo}
        </View>
      </View>
      <Spacer size={20} />
      {contentCard}
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  txtSubInfo: {
    color: Colors.border,
  },
});
