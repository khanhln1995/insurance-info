import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
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
  }: {
    title: string;
    value: string;
    isFlex?: boolean;
    isBorderBottom?: boolean;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: isBorderBottom ? '#C5CED3' : '',
          borderBottomWidth: isBorderBottom ? 0.67 : 0,
          paddingBottom: 7.37,
          paddingTop: 11.39
        }}
      >
        <AppText variant="label" style={{ 
            color: "#4E4E4E", 
            marginRight: 24
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
          <RenderInfoLine title="Địa chỉ" value={userInfo?.diachi} isBorderBottom={false}/>
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
      style={{ backgroundColor: Colors.bgInfo, padding: 17.41, borderRadius: 5 }}
    >
      <View style={{
          flexDirection: "row", 
          gap: 12, 
          alignItems: "center",
          borderBottomColor: '#949899',
          borderBottomWidth: 0.67, 
          paddingBottom: 10.02,
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
        <View>
          <AppText variant="bodyBold" style={{ marginBottom: 4, fontWeight: '600' }}>
            {name}
          </AppText>
          <AppText variant="body">{subInfo}</AppText>
        </View>
      </View>
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
