import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "@/components/AppText";
import SupportInactive from "../assets/images/icon/support-inactive.svg";
import GlobalSearchInactive from "../assets/images/icon/global-search-inactive.svg";
import ListInactive from "../assets/images/icon/list-inactive.svg";
import SettingUser from "../assets/images/icon/setting-user.svg";

const BottomMenuBar = () => {
  return (
    <View
      style={{
        borderTopWidth: 0.5,
        borderTopColor: "#C6C6C6",
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "white",
        height: 49.23,
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <SettingUser width={21.53} height={21.6}/>
        <AppText variant="captionBold" style={{ color: Colors.primary, marginTop: 6 }}>
          QL cá nhân
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ListInactive width={14.41} height={20.93} />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 6 }}>
          Dịch vụ công
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <GlobalSearchInactive width={19.79} height={20.63} />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 6 }}>
          Tra cứu
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <SupportInactive width={16.74} height={16.26} />
        <AppText variant="captionBold" style={{ color: Colors.txtDark, marginTop: 6 }}>
          Trợ giúp
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenuBar;

