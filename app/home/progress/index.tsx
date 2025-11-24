import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import EmploymentHistoryTable from "@/components/EmploymenHistoryTable";
import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const BOTTOM_BAR_HEIGHT = 150;

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
      tabTitle: "BHTNLĐ-BNN",
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

  // ------------------------------------
  //  SWIPE LEFT / RIGHT TO CHANGE TAB
  // ------------------------------------
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20; 
      },
      onPanResponderRelease: (_, gestureState) => {
        console.log('gestureState.dx', gestureState);
        
        const currentIndex = progressData.findIndex(
          (t) => t.id === selectedTab.id
        );

        if (gestureState.dx < -50) {
          const nextIndex = currentIndex + 1;
          if (nextIndex < progressData.length) {
            setSelectedTab(progressData[nextIndex]);
          }
        } else if (gestureState.dx > 50) {
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            setSelectedTab(progressData[prevIndex]);
          }
        }
      },
    })
  ).current;

  const calculateTotalTime = (progress: any) => {
    let totalMonths = 0;

    progress.forEach((item: any) => {
      const [startMonth, startYear] = item.tuthang.split("/").map(Number);
      const [endMonth, endYear] = item.denthang.split("/").map(Number);

      const startTotalMonths = startYear * 12 + (startMonth - 1);
      const endTotalMonths = endYear * 12 + (endMonth - 1);

      const diff = endTotalMonths - startTotalMonths + 1;
      totalMonths += diff;
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return `${years} năm ${months} tháng`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack
        title="QUÁ TRÌNH THAM GIA"
        titleVariant="headingMdRegular"
        textStyle={{ marginBottom: 10 }}
        containerStyle={{ height: 60 }}
      />

      <View 
        style={{ flex: 1, justifyContent: "space-between" }}
        {...panResponder.panHandlers}
      >
        <View style={{ flex: 1 }}>
          {/* TAB ROW */}
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
                          ? tab.id === 5
                            ? "#0574CE"
                            : ""
                          : tab.id === 5
                          ? Colors.border
                          : "",
                        borderWidth: tab.id === 5 ? 2 : 0,
                      },
                    ]}
                    onPress={() => setSelectedTab(tab)}
                  >
                    <Image
                      source={isSelected ? tab.tabActiveIcon : tab.tabIcon}
                      style={{ width: 47.89, height: 47.89 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <AppText
                    variant="label"
                    style={[
                      styles.tabLabel,
                      { color: isSelected ? "#0574CE" : Colors.border },
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {tab.tabTitle}
                  </AppText>
                </View>
              );
            })}
          </View>

          {/* SCROLL + SWIPE */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 7,
              paddingTop: 18,
              paddingBottom: BOTTOM_BAR_HEIGHT + 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            {selectedTab.id != 5 && (
              <>
                <View style={styles.description}>
                  <AppText
                    variant="headingMd"
                    style={{ color: "#306BA3" }}
                  >
                    Quá trình tham gia {selectedTab.title}
                  </AppText>

                  <AppText variant="small">
                    Tổng thời gian tham gia:{" "}
                    {calculateTotalTime(selectedTab.data?.progress) || "-"}
                  </AppText>

                  {!(selectedTab.id == 4 || selectedTab.id == 3) && (
                    <AppText variant="small" style={{ color: "#CE0301" }}>
                      Tổng thời gian chậm đóng :{" "}
                      {selectedTab?.data?.totalDueTime}
                    </AppText>
                  )}
                </View>

                <EmploymentHistoryTable
                  data={selectedTab.data?.progress}
                  onPressView={(detail) => {
                    router.push({
                      pathname: "/home/progress/detail",
                      params: {
                        detail: JSON.stringify(detail),
                        title: selectedTab.tabTitle,
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

const TAB_ITEM_WIDTH = 60;

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10.05,
    paddingHorizontal: 19,
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
    backgroundColor: "white",
  },
  tabLabel: {
    marginTop: 5,
    textAlign: "center",
    color: Colors.border,
    lineHeight: 13,
  },
  description: {
    backgroundColor: "#F3F3F3",
    padding: 8.82,
    borderWidth: 0.67,
    borderColor: "#D3D3D3",
  },
});
