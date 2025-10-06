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
      title: "Bảo hiểm thất nghiệp",
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
      <HeaderBack
        title="QUÁ TRÌNH THAM GIA"
        textStyle={{ fontWeight: "400", fontSize: 20, marginBottom: 10 }}
        containerStyle={{ height: 60 }}
      />

      {/* Use horizontal ScrollView to avoid squeezing when labels wrap */}
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.tabsRow}>
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
                      style={{ width: 40, height: 40 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* Constrain width + wrap up to 2 lines, then ellipsize */}
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isSelected ? Colors.primary : Colors.border },
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {tab.tabTitle}
                  </Text>
                </View>
              );
            })}
          </View>
          <Spacer size={20} />
          <ScrollView style={{ paddingHorizontal: 10 }}>
            {selectedTab.id != 5 && (
              <>
                <View style={styles.description}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.primary,
                    }}
                  >
                    Quá trình tham gia {selectedTab.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Tổng thời gian tham gia: {selectedTab?.data?.totalTime}
                  </Text>
                  {!(selectedTab.id == 4 || selectedTab.id == 3) && (
                    <Text style={{ color: "red", fontSize: 16 }}>
                      Tổng thời gian chậm đóng :{" "}
                      {selectedTab?.data?.totalDueTime}
                    </Text>
                  )}
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

const TAB_ITEM_WIDTH = 60; // wide enough for 2-line titles like "BHTNLD-BNN"

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "white",
  },
  tabLabel: {
    marginTop: 6,
    textAlign: "center",
    color: Colors.border,
    fontSize: 14, // slightly smaller to prevent ugly wraps
    lineHeight: 13, // tighter line height looks better in 2 lines
  },
  description: {
    backgroundColor: Colors.bgInfo,
    padding: 20,
  },
});
