import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MedInSurance = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderBack title="THẺ BẢO HIỂM Y TẾ" />
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus perferendis voluptas, iusto ratione adipisci neque alias
              consequuntur reprehenderit quam vitae, eaque aliquam non, ad
              architecto ab sint quia provident? Corporis.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomMenuBar />
    </View>
  );
};

export default MedInSurance;

const styles = StyleSheet.create({});
