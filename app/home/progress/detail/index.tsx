import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useSwipeMenu } from "@/hooks/useSwipeMenu";
import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Animated, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const DetailProgress = () => {
  const { detail, title } = useLocalSearchParams();
  const data = JSON.parse(detail as string);
  const router: any = useRouter();
  const [visible, setVisible] = React.useState(false);
  const menuTranslateX = React.useRef(new Animated.Value(-DRAWER_W)).current;

  const closeMenu = () => {
    Animated.spring(menuTranslateX, {
      toValue: -DRAWER_W,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const { panResponder, pan } = useSwipeMenu({
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
    <Animated.View
      style={{ backgroundColor: "#fff", flex: 1 }}
      {...panResponder.panHandlers}
    >
      <SafeAreaView />
      <HeaderBack
        title="Chi tiết"
        textColor={Colors.primary}
        titleVariant="subheading"
        styleContainer={{ backgroundColor: "#fff" }}
        iconLeft={
          <Entypo name="chevron-left" size={33} color={Colors.primary} />
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Spacer size={20} />
        {/* From/To months */}
        <View style={styles.rangeRow}>
          <AppText variant="labelBold" style={{ fontWeight: "500" }}>
            Từ tháng: {data?.tuthang}
          </AppText>
          <AppText variant="labelBold" style={{ fontWeight: "500" }}>
            Đến tháng: {data?.denthang}
          </AppText>
        </View>

        {/* Blue info card */}
        <View style={styles.infoCard}>
          {title !== 'BHYT' && renderInfoLine("Chức vụ", data?.chucvu)}
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

      <SideMenu
        visible={visible}
        translateX={menuTranslateX}
        onClose={closeMenu}
        onLogout={() => router.replace("/auth")}
      />
    </Animated.View>
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
    paddingVertical: 15.2,
  },

  infoCard: {
    backgroundColor: '#3566A0', // matches the blue block in your screenshot
    marginHorizontal: 20.43,
    paddingHorizontal: 10.72,
    paddingVertical: 8,
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
    marginHorizontal: 20.43,
    // borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1.1,
    borderColor: "#DCE7FA",
  },
  rowTopBorder: {
    borderTopWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13.23,
    borderTopWidth: 1.1,
    borderColor: "#DCE7FA",
    justifyContent: "space-between",
  },
  cellLeft: {
    flex: 1.2,
    textAlign: "center",
  },
  cellRight: {
    textAlign: "right",
  },
  cellLeftWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 4.73,
  },

  cellRightWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 4.73,
  },

  divider: {
    width: 1.1,
    backgroundColor: "#DCE7FA",
    alignSelf: "stretch", // ensures it fills full row height
  },
});
