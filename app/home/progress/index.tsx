import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import EmploymentHistoryTable from "@/components/EmploymenHistoryTable";
import HeaderBack from "@/components/HeaderBack";
import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import { Colors } from "@/constants/Colors";
import { useSwipeMenu } from "@/hooks/useSwipeMenu";
import { useUser } from "@/hooks/user";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const BOTTOM_BAR_HEIGHT = 150;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Progress = () => {
  const router: any = useRouter();
  const { progressList } = useUser();
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

  // PanResponder cho gesture mép trái (mở menu / back nhanh)
  const { panResponder: edgePanResponder } = useSwipeMenu({
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

  // keep a ref to the latest selectedTab so PanResponder callbacks see updated value
  const selectedTabRef = React.useRef(selectedTab);
  React.useEffect(() => {
    selectedTabRef.current = selectedTab;
  }, [selectedTab]);

  // Animated horizontal swipe state
  const animatedX = React.useRef(new Animated.Value(0)).current;
  const panStartOffset = React.useRef(0);

  // sync animation when selectedTab changes (e.g. tap)
  React.useEffect(() => {
    const index = progressData.findIndex((t) => t.id === selectedTab.id);
    Animated.spring(animatedX, {
      toValue: -index * SCREEN_WIDTH,
      useNativeDriver: false,
      bounciness: 0,
    }).start();
  }, [selectedTab]);
  const pressStartTime = useRef(0);

  // ------------------------------------
  //  INTERACTIVE PANRESPONDER — SMOOTH DRAG
  // ------------------------------------
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 6
        );
      },

      onPanResponderGrant: () => {
        pressStartTime.current = Date.now();
        panStartOffset.current = animatedX.__getValue();
        animatedX.stopAnimation();
      },

      onPanResponderMove: (_, gestureState) => {
        const currentIndex = progressData.findIndex(
          (t) => t.id === selectedTabRef.current.id
        );
        if (currentIndex === 0 && gestureState.dx > 0) {
          return;
        }

        // follow finger for normal horizontal swipes
        animatedX.setValue(panStartOffset.current + gestureState.dx);
      },

      onPanResponderRelease: (_, gestureState) => {
        const currentIndex = progressData.findIndex(
          (t) => t.id === selectedTabRef.current.id
        );
         const duration = Date.now() - pressStartTime.current;

        const isFastSwipeRight =
          duration < 600 && gestureState.vx > 0.5 && gestureState.dx > 50;
        if (currentIndex === 0 && gestureState.dx > 30 && isFastSwipeRight) {
          if (router.canGoBack?.()) {
            router.back();
          }
          // ensure content snaps back to first tab
          Animated.spring(animatedX, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 0,
          }).start();
          return;
        }

        // compute final offset and decide nearest index
        const finalOffset = panStartOffset.current + gestureState.dx;
        let targetIndex = Math.round(-finalOffset / SCREEN_WIDTH);

        // clamp
        targetIndex = Math.max(0, Math.min(progressData.length - 1, targetIndex));

        // animate to target
        Animated.spring(animatedX, {
          toValue: -targetIndex * SCREEN_WIDTH,
          useNativeDriver: false,
          bounciness: 0,
        }).start();

        // update selected tab
        setSelectedTab(progressData[targetIndex]);
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

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation?.setOptions?.({ gestureEnabled: !visible });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack
        title="QUÁ TRÌNH THAM GIA"
        titleVariant="headingMdRegular"
        textStyle={{ marginBottom: 10 }}
        containerStyle={{ height: 60 }}
      />

      {/* GẮN gesture SWIPE TAB vào nội dung chính + trượt cả màn theo tay */}
      <Animated.View
        style={{ flex: 1 }}
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

          {/* HORIZONTAL SWIPEABLE CONTENT (each panel = SCREEN_WIDTH) */}
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: SCREEN_WIDTH * progressData.length,
              transform: [{ translateX: animatedX }],
            }}
          >
            {progressData.map((tab) => (
              <View key={tab.id} style={{ width: SCREEN_WIDTH }}>
                {/* SCROLL CONTENT for each tab */}
                {tab.id !== 5 && (
                  <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                      paddingHorizontal: 7,
                      paddingTop: 18,
                      paddingBottom: BOTTOM_BAR_HEIGHT + 24,
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.description}>
                  <AppText
                    variant="headingMd"
                    style={{ color: "#306BA3" }}
                  >
                    Quá trình tham gia {selectedTab.title}
                      </AppText>

                      <AppText variant="small">
                        Tổng thời gian tham gia:{" "}
                        {calculateTotalTime(tab.data?.progress) || "-"}
                      </AppText>

                      {!(tab.id == 4 || tab.id == 3) && (
                        <AppText variant="small" style={{ color: "#CE0301" }}>
                          Tổng thời gian chậm đóng : {tab?.data?.totalDueTime}
                        </AppText>
                      )}
                    </View>

                    <EmploymentHistoryTable
                      data={tab.data?.progress}
                      onPressView={(detail) => {
                        router.push({
                          pathname: "/home/progress/detail",
                          params: {
                            detail: JSON.stringify(detail),
                            title: tab.tabTitle,
                          },
                        });
                      }}
                      isBHYT={tab.id === 4}
                    />
                  </ScrollView>
                )}
              </View>
            ))}
          </Animated.View>
        </View>

        <BottomMenuBar />
      </Animated.View>

      {/* Lớp mép trái riêng cho gesture mở menu / back nhanh */}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 24, // khớp EDGE_WIDTH trong useSwipeMenu
          }}
          {...edgePanResponder.panHandlers}
        />

      <SideMenu
        visible={visible}
        translateX={menuTranslateX}
        onClose={closeMenu}
        onLogout={() => router.replace("/auth")}
      />
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
