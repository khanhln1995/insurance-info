import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeArea = ({ children, style }: SafeAreaProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={[]}
        style={[
          {
            flex: 1,
            backgroundColor: "white",
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeArea;

const styles = StyleSheet.create({});
