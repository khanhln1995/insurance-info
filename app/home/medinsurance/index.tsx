import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MedInSurance = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderBack title="THẺ BẢO HIỂM Y TẾ" textStyle={{ fontWeight: "500" }} />
      <ScrollView
        style={{
          padding: 20,
          flex: 1,
          backgroundColor: "white",
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
            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              Thông tin quyền lợi
            </Text>
            <Spacer size={10} />
            <Text style={{ marginLeft: 10, lineHeight: 18 }}>
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
            </Text>
          </View>
          <Spacer size={20} />
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
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: Colors.primary }}>Sử dụng thẻ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("@/assets/images/icon/info-card.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: Colors.primary }}>Hình ảnh thẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomMenuBar />
    </View>
  );
};

export default MedInSurance;

const styles = StyleSheet.create({});
