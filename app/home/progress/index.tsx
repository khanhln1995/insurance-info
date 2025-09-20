import EmploymentHistoryTable, {
  EmploymentRow,
} from "@/components/EmploymenHistoryTable";
import HeaderBack from "@/components/HeaderBack";
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

const progressData = [
  {
    id: 1,
    tabTitle: "BHXH",
    tabIcon: require("@/assets/images/tab/bhxh-inactive.png"),
    tabActiveIcon: require("@/assets/images/tab/bhxh-active.png"),
    title: "Bảo hiểm xã hội",
  },
  {
    id: 2,
    tabTitle: "BHTN",
    tabIcon: require("@/assets/images/tab/bhtn-inactive.png"),
    tabActiveIcon: require("@/assets/images/tab/bhtn-active.png"),
    title: "Bảo hiểm trách nhiệm",
  },
  {
    id: 3,
    tabTitle: "BHTNLD-BNN",
    tabIcon: require("@/assets/images/tab/bhtnldbnn-inactive.png"),
    tabActiveIcon: require("@/assets/images/tab/bhtnldbnn-active.png"),
    title: "Bảo hiểm tai nạn lao động, bệnh nghề nghiệp",
  },
  {
    id: 4,
    tabTitle: "BHYT",
    tabIcon: require("@/assets/images/tab/bhyt-inactive.png"),
    tabActiveIcon: require("@/assets/images/tab/bhyt-active.png"),
    title: "Bảo hiểm y tế",
  },
  {
    id: 5,
    tabTitle: "C14-TS",
    tabIcon: require("@/assets/images/tab/c14ts-inactive.png"),
    tabActiveIcon: require("@/assets/images/tab/c14ts-active.png"),
    title: "Bảo hiểm xã hội",
  },
];

const rows: EmploymentRow[] = [
  {
    id: 1,
    fromMonth: "07/2024",
    toMonth: "09/2025",
    company: "CÔNG TY TNHH KINH DOANH THIẾT BỊ TECHNOLOGY VN",
    position: "Nhân viên",
  },
  // more rows...
];

const Progress = () => {
  const [selectedTab, setSelectedTab] = React.useState(progressData[0]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack title="QUÁ TRÌNH THAM GIA" />

      {/* Use horizontal ScrollView to avoid squeezing when labels wrap */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {progressData.map((tab) => {
            const isSelected = selectedTab.id === tab.id;
            return (
              <View key={tab.id} style={styles.tabItem}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    {
                      borderColor: isSelected ? Colors.primary : Colors.border,
                    },
                  ]}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={isSelected ? tab.tabActiveIcon : tab.tabIcon}
                    style={{ width: 45, height: 45 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Constrain width + wrap up to 2 lines, then ellipsize */}
                <Text
                  style={styles.tabLabel}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {tab.tabTitle}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <Spacer size={20} />
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.description}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.primary,
              }}
            >
              Quá trình tham gia {selectedTab.title}
            </Text>
            <Text>Tổng thời gian tham gia: 1 năm 3 tháng</Text>
            <Text style={{ color: "red" }}>
              Tổng thời gian chậm đóng : 1 năm 2 tháng
            </Text>
          </View>
          <EmploymentHistoryTable
            data={rows}
            onPressView={(row) => console.log("View row:", row.id)}
          />
        </View>
      </View>
    </View>
  );
};

export default Progress;

const TAB_ITEM_WIDTH = 68; // wide enough for 2-line titles like "BHTNLD-BNN"

const styles = StyleSheet.create({
  tabsRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14, // if gap unsupported in your RN version, replace with margins on tabItem
  },
  tabItem: {
    width: TAB_ITEM_WIDTH,
    alignItems: "center",
  },
  tab: {
    borderRadius: 99,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "white",
  },
  tabLabel: {
    marginTop: 6,
    textAlign: "center",
    color: Colors.border,
    fontSize: 11, // slightly smaller to prevent ugly wraps
    lineHeight: 13, // tighter line height looks better in 2 lines
  },
  description: {
    backgroundColor: Colors.bgInfo,
    padding: 20,
  },
});
