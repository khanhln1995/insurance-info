import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const MedInSurance = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderBack
        title="THẺ BẢO HIỂM Y TẾ"
        titleVariant="headingMdRegular"
      />
      <View
        style={{
          padding: 20,
          flex: 1,
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <View>
          <InfoCard type="insurance" />
          <Spacer size={20} />
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.bgInfo,
              borderRadius: 5,
            }}
          >
            <AppText variant="headingMdBold" style={{ color: '#306BA3' }}>
              Thông tin quyền lợi
            </AppText>
            <Spacer size={10} />
            <AppText variant="small" style={{ marginLeft: 10, lineHeight: 17.4 }}>
              Được hưởng 80% chi phí khám bệnh, chữa bệnh trong phạm vi được
              hường BHYT (áp dụng tỷ lệ thanh toán một sô thuôc, hóa chât, vật
              tư y tê và dịch vụ kỹ thuật theo quy định của Bộ trưởng Bộ Y tế).
              Trong trường hợp điều trị nội trú trái tuyến tại CSKCB tuyến TW sẽ
              được hưởng 32% (TH trên thẻ có mã nơi sinh sông là K1 hoặc K2 hoặc
              K3 sẽ được 80%), CSKCB tuyến tỉnh sẽ được hưởng 48% (TH trên thẻ
              có mã nơi sinh sống là K1 hoặc K2 hoặc K3 sẽ được 80%), từ ngày
              01/01/2021 sẽ hưởng 80%, CSKCB là bệnh viện tuyến huyện sẽ hưởng
              80% Chi phí trong phạm vi hưởng BHYT (áp dụng tỷ lệ thanh toán một
              số thuốc, hóa chất, vật tư y tế và dịch vụ kỹ thuật theo quy định
              của Bộ trưởng Bộ Y tế).
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
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Image
              source={require("@/assets/images/icon/qr.png")}
              style={{ width: 26.46, height: 26.46 }}
            />
            <AppText variant="label" style={{ color: '#306BA3' }}>
              Sử dụng thẻ
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            onPress={() => router.push("/home/medinsurance/card")}
          >
            <Image
              source={require("@/assets/images/icon/info-card.png")}
              style={{ width: 26.46, height: 26.46 }}
            />
             <AppText variant="label" style={{ color: '#306BA3' }}>
              Hình ảnh thẻ
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <BottomMenuBar />
    </View>
  );
};

export default MedInSurance;

