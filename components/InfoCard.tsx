import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Spacer from "./Spacer";

interface Props {
  type: "user" | "insurance";
}

const InfoCard = ({ type }: Props) => {
  const { userInfo, medInsurance } = useUser();

  let subInfo: any;
  let contentCard: any;
  let name: any;
  const RenderInfoLine = ({
    title,
    value,
    isFlex = true,
  }: {
    title: string;
    value: string;
    isFlex?: boolean;
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
        <Text style={{ color: Colors.txtDark, flex: 1 }}>{title}</Text>
        <Text
          style={{
            color: Colors.txtDark,
            flex: isFlex ? 1 : 2, // let value take remaining space
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
      name = userInfo?.ten;
      break;
    case "insurance":
      subInfo = (
        <View>
          <Text style={styles.txtSubInfo}>Thời hạn có giá trị</Text>
          <Text style={styles.txtSubInfo}>{medInsurance?.thoigian}</Text>
        </View>
      );
      contentCard = (
        <View>
          <RenderInfoLine title="Ngày sinh" value={medInsurance?.ngaysinh} />
          <RenderInfoLine title="Giới tính" value={medInsurance?.gioitinh} />
          <RenderInfoLine title="Số thẻ BHYT" value={medInsurance?.sothebhyt} />
          <RenderInfoLine title="Nơi ĐKKCB BĐ" value={medInsurance?.noidk} />
          <RenderInfoLine
            title="Thời điểm 5 năm liên tục"
            value={medInsurance?.thoidiem5namlientuc}
          />
        </View>
      );
      name = medInsurance?.ten;
      break;
  }
  return (
    <View
      style={{ backgroundColor: Colors.bgInfo, padding: 15, borderRadius: 5 }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={{
            backgroundColor: "white",
            width: 50,
            height: 50,
            borderRadius: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/icon/avatar-male.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
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
    color: Colors.txtDark,
  },
});
