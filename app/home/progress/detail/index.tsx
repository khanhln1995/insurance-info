import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

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
      <SafeAreaView />
      <HeaderBack
        title="Chi tiết"
        textColor={Colors.primary}
        textStyle={{ fontSize: 18 }}
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
              <View style={styles.cellLeftWrapper}>
                <Text style={styles.cellLeft}>Tiền lương đóng BHYT</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.cellRightWrapper}>
                <Text style={styles.cellRight}>{val}</Text>
              </View>
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
    fontSize: 14,
  },

  infoCard: {
    backgroundColor: Colors.primary, // matches the blue block in your screenshot
    marginHorizontal: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
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
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
  },
  cellLeft: {
    flex: 1.2,
    fontSize: 16,
    color: "#111827",
  },
  cellRight: {
    flex: 0.8,
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
    textAlign: "right",
    paddingLeft: 12, // add spacing after the line
  },
  cellLeftWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 14,
    paddingRight: 8,
  },

  cellRightWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 14,
    paddingLeft: 8,
  },

  divider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    alignSelf: "stretch", // ensures it fills full row height
  },
});
