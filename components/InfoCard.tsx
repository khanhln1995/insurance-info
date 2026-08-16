import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

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
    isBorderBottom = true,
    alignTop = false,
  }: {
    title: string;
    value: string;
    isFlex?: boolean;
    isBorderBottom?: boolean;
    alignTop?: boolean;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: alignTop ? "flex-start" : "center",
          borderBottomColor: isBorderBottom ? '#C5CED3' : '',
          borderBottomWidth: isBorderBottom ? 0.67 : 0,
          paddingBottom: 7.37,
          paddingTop: 11.39
        }}
      >
        <AppText variant="label" style={{
            color: "#4E4E4E",
            marginRight: 24,
            fontSize: 13.07,
            // flex: 1
          }}
        >
          {title}
        </AppText>
        <AppText
          variant="label"
          style={{
            color: "#4E4E4E",
            flex: isFlex ? 1 : 2,
            textAlign: "right", // align to right if you want
            fontSize: 13.07,
            maxWidth: 250,
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
          <RenderInfoLine title="Địa chỉ" value={userInfo?.diachi} isBorderBottom={false} alignTop />
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
          <RenderInfoLine title="Nơi ĐKKCB BĐ" value={medInsurance?.noidk} alignTop />
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
    <LinearGradient
      colors={[Colors.bgInfoGradientStart, Colors.bgInfoGradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ padding: type === "user" ? 17.41 : 10, borderRadius: 5 }}
    >
      <View style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          borderBottomColor: '#949899',
          borderBottomWidth: 0.67,
          paddingBottom: type === "user" ? 10.02 : 6,
          paddingTop: type === "user" ? 12 : 0,
          marginTop: type === "insurance" ? -4 : 0
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 56,
            height: 56,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {avatar?.uri ? (
            <Image
              source={{ uri: avatar.uri }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("@/assets/images/icon/avatar-male.png")}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          )}
        </View>
        <View>
          <AppText variant="bodyBold" style={{ marginBottom: 4, fontWeight: '600' }}>
            {name}
          </AppText>
          <AppText variant="body">{subInfo}</AppText>
        </View>
      </View>
      {contentCard}
    </LinearGradient>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  txtSubInfo: {
    color: Colors.txtDark,
  },
});
