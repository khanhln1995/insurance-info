import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacer from "./Spacer";

interface Props {
  type: "user" | "insurance";
}

const InfoCard = ({ type }: Props) => {
  const { userInfo } = useUser();
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
          <Text style={styles.txtSubInfo}>Mã BHXH : {userInfo?.masoBHXH}</Text>
        </View>
      );
      contentCard = (
        <View>
          <RenderInfoLine title="Ngày sinh" value={userInfo?.ngaysinh} />
          <RenderInfoLine title="ĐDCN/CCCD/Hộ chiếu" value={userInfo?.cmnd} />
          <RenderInfoLine title="Số điện thoại" value={userInfo?.sdt} />
          <RenderInfoLine title="Địa chỉ" value={userInfo?.diachi} />
        </View>
      );
      break;
    case "insurance":
      subInfo = (
        <View>
          <Text style={styles.txtSubInfo}>Thời hạn có giá trị</Text>
          <Text style={styles.txtSubInfo}>1/1/2025 đến 31/12/2025</Text>
        </View>
      );
      contentCard = (
        <View>
          <RenderInfoLine title="Ngày sinh" value="01/01/2000" />
          <RenderInfoLine title="GIới tính" value="Nam" />
          <RenderInfoLine title="Số thẻ BHYT" value="123213123" />
          <RenderInfoLine
            title="Nơi ĐKKCB BĐ"
            value="Bệnh viện đa khoa Sài gòn"
          />
          <RenderInfoLine title="Thời điểm 5 năm liên tục" value="01/01/2000" />
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
          <Text style={{ fontWeight: "bold" }}>{userInfo?.ten}</Text>
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
