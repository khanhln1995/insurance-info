import React, { useEffect } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { TextVariant } from "@/components/AppText";
import { useHeaderBackFade } from "@/hooks/useHeaderBackFade";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import { useSelector } from "react-redux";

export interface HeaderBackProps {
  title?: string;
  isGoBack?: boolean;
  iconRight?: any;
  onGoBack?: () => void;
  styleContainer?: ViewStyle;
  textColor?: string;
  iconLeft?: any;
  textStyle?: any;
  titleVariant?: TextVariant;
  backTitle?: string;
  backIconRight?: any;
  backIconLeft?: any;
  colors?: string[];
}

// Helper function to get variant text styles for Animated.Text
const getVariantStyle = (variant: TextVariant): TextStyle => {
  const variantMap: Record<TextVariant, TextStyle> = {
    small: { fontWeight: "400", fontSize: 13.4 },
    smallBold: { fontWeight: "700", fontSize: 13.4 },
    subheading: { fontWeight: "700", fontSize: 19.85 },
    headingMdBold: { fontWeight: "700", fontSize: 14.74 },
    headingMd: { fontWeight: "400", fontSize: 14.74 },
    bodyBold: { fontWeight: "500", fontSize: 15.4 },
    body: { fontWeight: "400", fontSize: 15.4 },
    textLoginBtn: { fontWeight: "600", fontSize: 17.41 },
    micro: { fontWeight: "400", fontSize: 12.06 },
    microBold: { fontWeight: "500", fontSize: 12.06 },
    labelBold: { fontWeight: "600", fontSize: 14.07 },
    label: { fontWeight: "400", fontSize: 14.07 },
    headingMdRegular: { fontWeight: "400", fontSize: 18.08 },
    caption: { fontWeight: "400", fontSize: 11 },
    captionBold: { fontWeight: "500", fontSize: 11 },
  };
  return variantMap[variant];
};

const HeaderBack = (props: HeaderBackProps) => {
  const pathName = usePathname();

  const router = useRouter();
  const {
    backIconLeft,
    backTitle,
    backIconRight,
    title,
    iconRight,
    isGoBack = true,
    onGoBack,
    styleContainer,
    textColor,
    iconLeft,
    textStyle,
    titleVariant = "headingMdRegular",
    colors = ["#26B8F1", "#0D71C7"],
  } = props;
  console.log(pathName);

  const translateX = useSelector((state: RootState) => state.swipeBack.translateX);
  const { currentHeaderOpacity, backHeaderOpacity } = useHeaderBackFade(translateX);
  const [currentTranslateX, setCurrentTranslateX] = React.useState(0);
  
  useEffect(() => {
    if (!translateX) {
      return;
    }
    const listenerId = translateX.addListener(({ value }) => {
      setCurrentTranslateX(value);
    });

    return () => {
      translateX.removeListener(listenerId);
    };
  }, [translateX]);

  return (
    <Animated.View>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        style={{
          paddingTop: [
            "/home/medinsurance/card",
            "/home/progress/detail",
          ].includes(pathName)
            ? 66
            : 27,
          // marginTop: [
          //   "/home/medinsurance/card",
          //   "/home/progress/detail",
          // ].includes(pathName)
          //   ? 66
          //   : 0,
          justifyContent: "flex-end",
          height: !["/home/medinsurance/card", "/home/progress/detail"].includes(
            pathName
          )
            ? 63.63
            : "auto",
        }}
      >
        {pathName !== "/home/medinsurance/card" && <SafeAreaView />}
        <View style={[styles.container, styleContainer]}>
          {isGoBack && (
            <Animated.View
              style={{
                zIndex: 9999,
                position: "absolute",
                left: "5%",
                top: 2,
                opacity: currentHeaderOpacity,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (onGoBack) {
                    onGoBack();
                  } else {
                    router.back();
                  }
                }}
              >
                {iconLeft ? (
                  iconLeft
                ) : (
                  <Entypo name="chevron-thin-left" size={24} color="white" />
                )}
              </TouchableOpacity>
            </Animated.View>
          )}
           { backIconLeft && (
            <Animated.View
              style={{
                zIndex: 9999,
                position: "absolute",
                left: "5%",
                top: 2,
                opacity: backHeaderOpacity,
              }}
            >
              { backIconLeft }
            </Animated.View>
          )}
          <Animated.Text
            style={[
              getVariantStyle(titleVariant),
              {
                color: "white",
                textAlign: "center",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                opacity: currentHeaderOpacity,
              },
              { color: textColor || "" },
              textStyle,
            ]}
          >
            {title ?? ""}
          </Animated.Text>
          {
            backTitle && (
              <Animated.Text
                style={[
                  getVariantStyle(titleVariant),
                  {
                    color: "white",
                    textAlign: "center",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: backHeaderOpacity,
                  },
                  { color: textColor || "" },
                  textStyle,
                ]}
              >
                {backTitle ?? ""}
              </Animated.Text>
            )
          }
          {iconRight && (
            <Animated.View
              style={{
                zIndex: 9999,
                position: "absolute",
                right: "6%",
                opacity: currentHeaderOpacity,
              }}
            >
              {iconRight}
            </Animated.View>
          )}
            {backIconRight && (
            <Animated.View
              style={{
                zIndex: 9999,
                position: "absolute",
                right: "6%",
                opacity: backHeaderOpacity,
              }}
            >
              {backIconRight}
            </Animated.View>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 35,
    paddingHorizontal: "8%",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
});
