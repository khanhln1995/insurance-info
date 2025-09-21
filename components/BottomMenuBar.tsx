import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BottomMenuBar = () => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 10,
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/setting-user.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ color: Colors.primary, fontSize: 10, marginTop: 5 }}>
          QL cá nhân
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/list-inactive.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ color: Colors.txtDark, fontSize: 10, marginTop: 5 }}>
          Dịch vụ công
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/global-search-inactive.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ color: Colors.txtDark, fontSize: 10, marginTop: 5 }}>
          Tra cứu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/support-inactive.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ color: Colors.txtDark, fontSize: 10, marginTop: 5 }}>
          Trợ giúp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenuBar;

const styles = StyleSheet.create({});
