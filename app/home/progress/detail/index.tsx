import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DetailProgress = () => {
  const { detail } = useLocalSearchParams();
  const data = JSON.parse(detail as string);

  const renderInfoLine = (label: string, value?: string) => (
    <Text style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}: </Text>
      <Text style={styles.infoValue}>{value || "-"}</Text>
    </Text>
  );

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderBack
        title="Chi tiết"
        textColor={Colors.primary}
        styleContainer={{ backgroundColor: "#fff" }}
        iconLeft={
          <Entypo name="chevron-thin-left" size={24} color={Colors.primary} />
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Spacer size={20} />
        {/* From/To months */}
        <View style={styles.rangeRow}>
          <Text style={styles.rangeText}>Từ tháng: {data?.tuthang}</Text>
          <Text style={styles.rangeText}>Đến tháng: {data?.denthang}</Text>
        </View>

        {/* Blue info card */}
        <View style={styles.infoCard}>
          {renderInfoLine("Chức vụ", data?.chucvu)}
          {renderInfoLine("Đơn vị công tác", data?.donvi)}
          {renderInfoLine("Nơi làm việc", data?.chitiet?.noilamviec)}
          {renderInfoLine("Loại tiền", data?.chitiet?.loaitien)}
        </View>

        {/* Salary rows */}
        <View style={styles.table}>
          {(data?.chitiet?.tienluong || []).map((val: string, idx: number) => (
            <View
              key={idx}
              style={[styles.row, idx === 0 && styles.rowTopBorder]}
            >
              <Text style={styles.cellLeft}>Tiền lương đóng BHYT</Text>
              <Text style={styles.cellRight}>{val}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailProgress;

const styles = StyleSheet.create({
  rangeRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rangeText: {
    color: "#111827",
    fontSize: 16,
  },

  infoCard: {
    backgroundColor: Colors.primary, // matches the blue block in your screenshot
    marginHorizontal: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoLine: {
    color: "#E6F0FF",
    lineHeight: 22,
    marginBottom: 6,
  },
  infoLabel: {
    color: "#E6F0FF",
  },
  infoValue: {
    color: "#ffffff",
    fontWeight: "700",
  },

  table: {
    backgroundColor: "#ffffff",
    marginHorizontal: 12,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  rowTopBorder: {
    borderTopWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
  },
  cellLeft: {
    fontSize: 16,
    color: "#111827",
  },
  cellRight: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
});
