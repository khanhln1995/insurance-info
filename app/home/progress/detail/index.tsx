import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AppText from "@/components/AppText";

const DetailProgress = () => {
  const { detail, title } = useLocalSearchParams();
  const data = JSON.parse(detail as string);

  const renderInfoLine = (label: string, value?: string) => (
    <AppText variant="small" style={styles.infoLine}>
      <AppText variant="small" style={styles.infoLabel}>
        {label}:{" "}
      </AppText>
      <AppText variant="smallBold" style={styles.infoValue}>
        {value || "-"}
      </AppText>
    </AppText>
  );

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView />
      <HeaderBack
        title="Chi tiết"
        textColor={Colors.primary}
        titleVariant="subheading"
        styleContainer={{ backgroundColor: "#fff" }}
        iconLeft={
          <Entypo name="chevron-thin-left" size={24} color={Colors.primary} />
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Spacer size={20} />
        {/* From/To months */}
        <View style={styles.rangeRow}>
          <AppText variant="labelBold">
            Từ tháng: {data?.tuthang}
          </AppText>
          <AppText variant="labelBold">
            Đến tháng: {data?.denthang}
          </AppText>
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
                <AppText variant="small" style={styles.cellLeft}>
                  {idx === 1
                    ? "Mức lương"
                    : `Tiền lương đóng ${
                        title == "BHTNLĐ-BNN" ? "quỹ TNLĐ, BNN" : title
                      }`}
                </AppText>
              </View>
              <View style={styles.divider} />
              <View style={styles.cellRightWrapper}>
                <AppText variant="small" style={styles.cellRight}>
                  {val}
                </AppText>
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

  infoCard: {
    backgroundColor: Colors.primary, // matches the blue block in your screenshot
    marginHorizontal: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  infoLine: {
    color: "#E6F0FF",
    lineHeight: 22,
  },
  infoLabel: {
    color: "#E6F0FF",
  },
  infoValue: {
    color: "#ffffff",
  },

  table: {
    backgroundColor: "#ffffff",
    marginHorizontal: 12,
    // borderRadius: 6,
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
    color: "#111827",
    textAlign: "center",
  },
  cellRight: {
    flex: 0.8,
    color: "#111827",
    textAlign: "right",
    paddingLeft: 12, // add spacing after the line
  },
  cellLeftWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
    paddingRight: 8,
  },

  cellRightWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
    paddingLeft: 8,
  },

  divider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    alignSelf: "stretch", // ensures it fills full row height
  },
});
