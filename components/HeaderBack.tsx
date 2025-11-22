import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
// import Text from '~components/Text';

import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import AppText, { TextVariant } from "@/components/AppText";
import { usePathname } from "expo-router";

export interface HeaderBackProps {
  title?: string;
  isGoBack?: boolean;
  iconRight?: any;
  onGoBack?: () => void;
  styleContainer?: ViewStyle;
  textColor?: string;
  goBackColor?: string;
  containerStyle?: any;
  iconLeft?: any;
  textStyle?: any;
  titleVariant?: TextVariant;
}

const HeaderBack = (props: HeaderBackProps) => {
  const pathName = usePathname();

  const router = useRouter();
  const {
    title,
    iconRight,
    isGoBack = true,
    onGoBack,
    styleContainer,
    textColor,
    goBackColor,
    containerStyle,
    iconLeft,
    textStyle,
    titleVariant = "headingMdRegular",
  } = props;
  return (
    <LinearGradient
      colors={["#26B8F1", "#0D71C7"]}
      start={{ x: 0, y: 0 }}
      style={{
        // marginTop: pathName != "/home/medinsurance/card" ? 0 : 55,
        height: 63.63,
        justifyContent: "flex-end",
      }}
    >
      {pathName != "/home/medinsurance/card" && <SafeAreaView />}
      <View style={[styles.container, styleContainer]}>
        {isGoBack && (
          <TouchableOpacity
            onPress={() => {
              onGoBack ? onGoBack?.() : router.back();
            }}
            style={{
              zIndex: 9999,
              position: "absolute",
              left: "5%",
              top: 2,
            }}
          >
            {iconLeft ? (
              iconLeft
            ) : (
              <Entypo name="chevron-thin-left" size={24} color="white" />
            )}
          </TouchableOpacity>
        )}
        <AppText
          variant={titleVariant}
          style={[
            {
              color: "white",
              textAlign: "center",
              flex: 1,
            },
            { color: textColor || "" },
            textStyle,
          ]}
        >
          {title ?? ""}
        </AppText>
        {iconRight && (
          <View
            style={{
              zIndex: 9999,
              position: "absolute",
              right: "6%",
              // top: 14,
            }}
          >
            {iconRight}
          </View>
        )}
      </View>
    </LinearGradient>
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
