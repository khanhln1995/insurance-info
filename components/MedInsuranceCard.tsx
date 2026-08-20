import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

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
        paddingBottom: 8,
        paddingTop: 8
      }}
    >
      <AppText variant="label" style={{ color: "#4E4E4E", marginRight: 24 }}>
        {title}
      </AppText>
      <AppText
        variant="label"
        style={{
          color: "#4E4E4E",
          flex: isFlex ? 1 : 2,
          textAlign: "right",
          maxWidth: 250,
        }}
      >
        {value}
      </AppText>
    </View>
  );
};

const MedInsuranceCard = () => {
  const { medInsurance, avatar } = useUser();

  return (
    <LinearGradient
      colors={[Colors.bgInfoGradientStart, Colors.bgInfoGradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ padding: 8, borderRadius: 5, paddingBottom: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          borderBottomColor: '#949899',
          borderBottomWidth: 0.67,
          paddingBottom: 6,
          marginTop: -4,
        }}
      >
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
        <View style={{ gap: 4 }}>
          <AppText variant="headingMdBold" style={{ fontWeight: '600' }}>
            {medInsurance?.ten}
          </AppText>
          <AppText variant="small" style={styles.txtSubInfo}>
            Thời hạn có giá trị
          </AppText>
          <AppText variant="small" style={styles.txtSubInfo}>
            {medInsurance?.thoigian}
          </AppText>
        </View>
      </View>
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
    </LinearGradient>
  );
};

export default MedInsuranceCard;

const styles = StyleSheet.create({
  txtSubInfo: {
    color: Colors.txtDark,
  },
});
