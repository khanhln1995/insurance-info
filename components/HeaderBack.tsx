import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
// import Text from '~components/Text';

import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

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
}

const HeaderBack = (props: HeaderBackProps) => {
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
  } = props;
  return (
    <LinearGradient colors={["#00ABF0", "#26BDF3"]} start={{ x: 0, y: 0 }}>
      <SafeAreaView />
      <View style={[styles.container, styleContainer]}>
        {isGoBack && (
          <TouchableOpacity
            onPress={() => {
              console.log("onGoBack");
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
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              flex: 1,
            },
            { color: textColor || "" },
            textStyle,
          ]}
        >
          {title ?? ""}
        </Text>
        {iconRight && (
          <View
            style={{
              zIndex: 9999,
              position: "absolute",
              right: "6%",
              top: 14,
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
    height: 30,
    paddingHorizontal: "8%",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
});
