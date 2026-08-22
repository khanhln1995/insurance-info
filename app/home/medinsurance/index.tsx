import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import Loading from "@/components/Loading";
import MedInsuranceCard from "@/components/MedInsuranceCard";
import Spacer from "@/components/Spacer";
import SwipeBackContainer from "@/components/SwipeBackContainer";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { HomeContent } from "../index";

const MedInSurance = () => {
  const router: any = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const Home = () => {
    return <HomeContent panResponder={null} router={router} />;
  }
  return (
    <>
      <SwipeBackContainer
        header={
          <HeaderBack
            title="THẺ BẢO HIỂM Y TẾ"
            titleVariant="headingMdRegular"
            textColor="white"
            textStyle={{ fontSize: 17.08 }}
            backTitle="QUẢN LÝ CÁ NHÂN"
            onGoBack={() => (router.replace("/home"))}
            backIconLeft={<Ionicons name="menu" size={33.33} color="white" />}
            backIconRight={
              <Image
                source={require("@/assets/images/bell.png")}
                style={{ width: 35.16, height: 23.11 }}
                resizeMode="contain"
              />
            }
          />
        }
        footer={<BottomMenuBar />}
        backScreen={Home}
        onBack={() => (router.canGoBack() ? router.back() : router.replace("/home"))}
        onLogout={() => router.replace("/auth")}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {
              !loading && (
                <>
                  <View style={{
                    width: "100%",
                    height: "92%",
                    padding: 18,
                    backgroundColor: Colors.bgScreen,
                   }}>
                    <MedInsuranceCard />
                    <Spacer size={39.52} />
                    <LinearGradient
                      colors={[Colors.bgInfoGradientStart, Colors.bgInfoGradientEnd]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingHorizontal: 9,
                        paddingVertical: 9.38,
                        borderRadius: 5,
                        paddingBottom: 40.02,
                      }}
                    >
                      <AppText variant="headingMdBold" style={{ color: "#426EA2", fontSize: 13.74 }}>
                        Thông tin quyền lợi:
                      </AppText>
                      <Spacer size={10} />
                      <AppText
                        variant="small"
                        style={{ paddingHorizontal: 8  , lineHeight: 17.4, fontSize: 13 }}
                      >
                        Được hưởng 80% chi phí khám bệnh, chữa bệnh trong phạm vi được
                        hưởng BHYT (áp dụng tỷ lệ thanh toán một số thuốc, hoá chất, vật
                        tư y tế và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế).
                      </AppText>
                      <AppText
                        variant="small"
                        style={{ paddingHorizontal: 8, lineHeight: 17.4, fontSize: 13 }}
                      >
                        Trong trường hợp điều trị nội trú trái tuyến tại CSKCB tuyến TW sẽ
                        được hưởng 32% (TH trên thẻ có mã nơi sinh sống là K1 hoặc K2 hoặc
                        K3 sẽ được 80%), CSKCB tuyến tỉnh sẽ được hưởng 48% (TH trên thẻ
                        có mã nơi sinh sống là K1 hoặc K2 hoặc K3 sẽ được 80%), từ ngày
                        01/01/2021 sẽ hưởng 80%, CSKCB là bệnh viện tuyến huyện sẽ
                        hưởng 80% Chi phí trong phạm vi hưởng BHYT (áp dụng tỷ lệ thanh
                        toán một số thuốc, hoá chất, vật tư y tế và dịch vụ kỹ thuật theo
                        quy định của Bộ trưởng Bộ Y tế).
                      </AppText>
                    </LinearGradient>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 60,
                      marginBottom: 16,
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
                      onPress={() =>
                        router.push("/home/medinsurance/card")
                      }
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
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Loading />
              </View>
            )}
          </View>
        </View>
      </SwipeBackContainer>
    </>
  );
};

export default MedInSurance;
