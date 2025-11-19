import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "@/components/AppText";

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
          style={{ width: 21.6, height: 21.6 }}
        />
        <AppText variant="captionBold" style={{ color: Colors.primary, marginTop: 5 }}>
          QL cá nhân
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/list-inactive.png")}
          style={{ width: 21.6, height: 21.6 }}
        />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 5 }}>
          Dịch vụ công
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/global-search-inactive.png")}
          style={{ width: 21.6, height: 21.6 }}
        />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 5 }}>
          Tra cứu
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/icon/support-inactive.png")}
          style={{ width: 21.6, height: 21.6 }}
        />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 5 }}>
          Trợ giúp
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenuBar;

const styles = StyleSheet.create({});
