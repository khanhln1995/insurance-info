import BottomMenuBar from "@/components/BottomMenuBar";
import EmploymentHistoryTable from "@/components/EmploymenHistoryTable";
import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Progress = () => {
  const router: any = useRouter();
  const { progressList } = useUser();
  const progressData = [
    {
      id: 1,
      tabTitle: "BHXH",
      tabIcon: require("@/assets/images/tab/bhxh-inactive.png"),
      tabActiveIcon: require("@/assets/images/tab/bhxh-active.png"),
      title: "Bảo hiểm xã hội",
      data: progressList.bhxh,
    },
    {
      id: 2,
      tabTitle: "BHTN",
      tabIcon: require("@/assets/images/tab/bhtn-inactive.png"),
      tabActiveIcon: require("@/assets/images/tab/bhtn-active.png"),
      title: "Bảo hiểm trách nhiệm",
      data: progressList.bhtn,
    },
    {
      id: 3,
      tabTitle: "BHTNLD-BNN",
      tabIcon: require("@/assets/images/tab/bhtnldbnn-inactive.png"),
      tabActiveIcon: require("@/assets/images/tab/bhtnldbnn-active.png"),
      title: "Bảo hiểm tai nạn lao động, bệnh nghề nghiệp",
      data: progressList.bhtnldbnn,
    },
    {
      id: 4,
      tabTitle: "BHYT",
      tabIcon: require("@/assets/images/tab/bhyt-inactive.png"),
      tabActiveIcon: require("@/assets/images/tab/bhyt-active.png"),
      title: "Bảo hiểm y tế",
      data: progressList.bhyt,
    },
    {
      id: 5,
      tabTitle: "C14-TS",
      tabIcon: require("@/assets/images/tab/c14ts-inactive.png"),
      tabActiveIcon: require("@/assets/images/tab/c14ts-active.png"),
      title: "Bảo hiểm xã hội",
    },
  ];
  const [selectedTab, setSelectedTab] = React.useState(progressData[0]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack title="QUÁ TRÌNH THAM GIA" />

      {/* Use horizontal ScrollView to avoid squeezing when labels wrap */}
      <View style={{ flex: 1, justifyContent: "space-between" }}>
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
                        borderColor: isSelected
                          ? Colors.primary
                          : Colors.border,
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
          <ScrollView style={{ paddingHorizontal: 10 }}>
            {selectedTab.id != 5 && (
              <>
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
                  <Text>
                    Tổng thời gian tham gia: {selectedTab?.data?.totalTime}
                  </Text>
                  <Text style={{ color: "red" }}>
                    Tổng thời gian chậm đóng : {selectedTab?.data?.totalDueTime}
                  </Text>
                </View>
                <EmploymentHistoryTable
                  data={selectedTab.data?.progress}
                  onPressView={(detail) => {
                    router.push({
                      pathname: "/home/progress/detail",
                      params: {
                        detail: JSON.stringify(detail),
                      },
                    });
                  }}
                  isBHYT={selectedTab.id === 4}
                />
              </>
            )}
          </ScrollView>
        </View>
        <BottomMenuBar />
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
