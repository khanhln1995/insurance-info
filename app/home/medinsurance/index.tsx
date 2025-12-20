import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import RoundAvatar from "@/components/RoundAvatar";
import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useSwipeMenu } from "@/hooks/useSwipeMenu";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

const MedInSurance = () => {
  const router: any = useRouter();
  const [visible, setVisible] = React.useState(false);
  const menuTranslateX = React.useRef(new Animated.Value(-DRAWER_W)).current;
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const closeMenu = () => {
    Animated.spring(menuTranslateX, {
      toValue: -DRAWER_W,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const { panResponder } = useSwipeMenu({
    onSwipeBack: () => {
      if (router.canGoBack?.()) {
        router.back();
      }
    },
    menuTranslateX,
    menuWidth: DRAWER_W,
    onRequestMenuVisible: (v) => {
      if (v) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderBack title="THẺ BẢO HIỂM Y TẾ" titleVariant="headingMdRegular" />
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          padding: 20,
          flex: 1,
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      > 
        {
          !loading && (
            <>
              <View>
                <InfoCard type="insurance" />
                <Spacer size={39.52} />
                <View
                  style={{
                    paddingHorizontal: 13.4,
                    paddingVertical: 9.38,
                    backgroundColor: Colors.bgInfo,
                    borderRadius: 5,
                  }}
                >
                  <AppText variant="headingMdBold" style={{ color: "#306BA3" }}>
                    Thông tin quyền lợi
                  </AppText>
                  <Spacer size={10} />
                  <AppText
                    variant="small"
                    style={{ marginLeft: 10, lineHeight: 17.4 }}
                  >
                    Được hưởng 80% chi phí khám bệnh, chữa bệnh trong phạm vi được
                    hưởng BHYT (áp dụng tỷ lệ thanh toán một số thuốc, hoá chất, vật
                    tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế).
                  </AppText>
                  <AppText
                    variant="small"
                    style={{ marginLeft: 10, lineHeight: 17.4 }}
                  >
                    Trong trường hợp điều trị nội trú trái tuyến tại CSKCB tuyến TW sẽ
                    được hưởng 32% (TH trên thẻ có mã nơi sinh sống là K1 hoặc K2 hoặc
                    K3 sẽ được 80%), CSKCB tuyến tỉnh sẽ được hưởng 48% (TH trên thẻ
                    có mã nơi sinh sống là K1 hoặc K2 hoặc K3 sẽ được 80%), từ ngày
                    01/01/2021 sẽ được hưởng 80%, CSKCB là bệnh viện tuyến huyện sẽ
                    hưởng 80% Chi phí trong phạm vi hưởng BHYT (áp dụng tỷ lệ thanh
                    toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo
                    quy định của Bộ trưởng Bộ Y tế)..
                  </AppText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Image
                    source={require("@/assets/images/qr.png")}
                    style={{ width: 26.46, height: 26.46 }}
                  />
                  <AppText variant="label" style={{ color: "#306BA3" }}>
                    Sử dụng thẻ
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                  onPress={() => router.push("/home/medinsurance/card")}
                >
                  <Image
                    source={require("@/assets/images/icon/info-card.png")}
                    style={{ width: 31.48, height: 21.52 }}
                  />
                  <AppText variant="label" style={{ color: "#306BA3" }}>
                    Hình ảnh thẻ
                  </AppText>
                </TouchableOpacity>
              </View>
            </>
          )
        } 
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIndicator
              size={66}
              color="#05c4ceff"
              trackWidth={3}
            />

            <Image
              source={require("@/assets/images/icon/logo.png")}
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                resizeMode: "contain",
                marginTop: 2,
                marginLeft: 2
              }}
            />
          </View>
        )}
      </Animated.View>
     
      <BottomMenuBar />

      <SideMenu
        visible={visible}
        translateX={menuTranslateX}
        onClose={closeMenu}
        onLogout={() => router.replace("/auth")}
      />
    </View>
  );
};

export default MedInSurance;
