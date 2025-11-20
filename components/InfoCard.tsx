import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Spacer from "./Spacer";

interface Props {
  type: "user" | "insurance";
}

const InfoCard = ({ type }: Props) => {
  const { userInfo, medInsurance, avatar } = useUser();

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
        <AppText variant="label" style={{ color: "#4E4E4E", flex: 1 }}>
          {title}
        </AppText>
        <AppText
          variant="label"
          style={{
            color: "#4E4E4E",
            flex: isFlex ? 1 : 2, // let value take remaining space
            textAlign: "right", // align to right if you want
          }}
        >
          {value}
        </AppText>
      </View>
    );
  };

  switch (type) {
    case "user":
      subInfo = (
        <View>
          <AppText variant="body" style={styles.txtSubInfo}>
            Mã BHXH : {userInfo?.masoBHXH}
          </AppText>
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
          <AppText variant="body" style={styles.txtSubInfo}>
            Thời hạn có giá trị
          </AppText>
          <AppText variant="body" style={styles.txtSubInfo}>
            {medInsurance?.thoigian}
          </AppText>
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
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            width: 60,
            height: 60,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {avatar?.uri ? (
            <Image
              source={{ uri: avatar.uri }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={require("@/assets/images/icon/avatar-male.png")}
              style={{ width: 60, height: 60 }}
            />
          )}
        </View>
        <View>
          <AppText variant="bodyBold" style={{ marginBottom: 4 }}>
            {name}
          </AppText>
          <AppText variant="body">{subInfo}</AppText>
        </View>
      </View>
      <Spacer size={12} />
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
