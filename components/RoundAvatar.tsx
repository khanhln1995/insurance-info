import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
interface RoundAvatarProps {
  size?: number;
  uri?: any;
  containerStyle?: ViewStyle[];
  color?: string;
}

const RoundAvatar = ({
  size = 50,
  uri,
  containerStyle = [],
  color,
}: RoundAvatarProps) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: 1000,

          justifyContent: "center",
          alignItems: "center",
        },
        ...containerStyle,
      ]}
    >
      {uri && (
        <Image
          source={uri}
          style={{ width: size, height: size, borderRadius: 50, zIndex: 10 }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default RoundAvatar;

const styles = StyleSheet.create({});
