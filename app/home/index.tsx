import Card from "@/assets/images/icon/card.svg";
import ChevronRight from "@/assets/images/icon/chevron-right.svg";
import MedPlus from "@/assets/images/icon/med-plus.svg";
import UserInfo from "@/assets/images/icon/user-info.svg";
import AppText from "@/components/AppText";
import BottomMenuBar from "@/components/BottomMenuBar";
import HeaderBack from "@/components/HeaderBack";
import InfoCard from "@/components/InfoCard";
import SafeArea from "@/components/SafeArea";
import SideMenu, { DRAWER_W } from "@/components/SideMenu";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useSwipeMenu } from "@/hooks/useSwipeMenu";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Image, TouchableOpacity, View } from "react-native";

const HomeHeader = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  return (
    <HeaderBack
      title="QUẢN LÝ CÁ NHÂN"
      titleVariant="headingMdRegular"
      iconLeft={<Ionicons name="menu" size={33.33} color="white" />}
      iconRight={
        <Image
          source={require("../../assets/images/bell.png")}
          style={{ width: 35.16, height: 23.11 }}
          resizeMode="contain"
        />
      }
      textColor="white"
      onGoBack={onOpenMenu}
    />
  );
};

export const HomeContent = ({
  panResponder,
  router,
}: {
  panResponder: any;
  router: any;
}) => {
  const RenderSelect = ({
    text,
    source: SvgIcon,
    route,
    isTop = true,
    isBottom = true,
  }: {
    text?: string;
    source?: any;
    route?: string;
    isTop?: boolean;
    isBottom?: boolean;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20.43,
          marginBottom: 2,
        }}
      >
        <View
          style={{
            width: 39.69,
            height: 39.69,
            marginBottom: 17,
          }}
        >
          {SvgIcon ? (
            <SvgIcon width={"100%"} height={"100%"} />
          ) : (
            <Image
              source={require("@/assets/images/icon/time.png")}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            if (route) {
              router.push(route);
            }
          }}
        >
          <View
            style={{
              flex: 1,
              borderTopWidth: isTop ? 1 : 0,
              borderBottomWidth: isBottom ? 1 : 0,
              borderBottomColor: "#7E7E7E",
              borderTopColor: "#7E7E7E",
              paddingBottom: 18.75,
            }}
          >
            <AppText
              variant="headingMdRegular"
              numberOfLines={1}
              style={{ color: Colors.txtSecondary }}
            >
              {text}
            </AppText>
          </View>

          <ChevronRight
            width={24.32}
            height={40.52}
            style={{ marginBottom: 19 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      {...(panResponder && panResponder.panHandlers)}
      style={{
        justifyContent: "space-between",
        alignSelf: "center",
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          paddingTop: 20,
          marginHorizontal: 17.41,
        }}
      >
        <InfoCard type="user" />
        <Spacer size={22.46} />
        <RenderSelect
          text="THẺ BHYT"
          source={Card}
          route="/home/medinsurance"
          isTop={false}
        />

        <RenderSelect
          text="QUÁ TRÌNH THAM GIA"
          route="/home/progress"
          isTop={false}
        />

        <RenderSelect
          text="THÔNG TIN HƯỞNG"
          source={UserInfo}
          isTop={false}
        />

        <RenderSelect
          text="SỔ KHÁM CHỮA BỆNH"
          source={MedPlus}
          isTop={false}
        />
      </View>
      <BottomMenuBar />
    </View>
  );
};

const Home = () => {
  const [visible, setVisible] = React.useState(false);
  const menuTranslateX = React.useRef(new Animated.Value(-DRAWER_W)).current;

  const openMenu = () => {
    menuTranslateX.setValue(0);
    setVisible(true);
  };

  const closeMenu = () => {
    menuTranslateX.setValue(-DRAWER_W);
    setVisible(false);
  };
  const router: any = useRouter();
  const { panResponder } = useSwipeMenu({
    onOpenMenu: openMenu,
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

  return (
    <SafeArea>
      <HomeHeader onOpenMenu={openMenu} />
      <HomeContent panResponder={panResponder} router={router} />
      <SideMenu
        visible={visible}
        translateX={menuTranslateX}
        onClose={closeMenu}
        onLogout={() => {
          router.replace("/auth");
        }}
      />
    </SafeArea>
  );
};

export default Home;
