import Input from "@/components/Input";
import RoundAvatar from "@/components/RoundAvatar";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <View></View>
        <TouchableOpacity
          onLongPress={() => {
            console.log("Pressed");
            router.push("/auth/datainput");
          }}
        >
          <AntDesign name="setting" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Spacer size={20} />
        <RoundAvatar size={100} color={Colors.primary} />
        <Spacer size={30} />
        <Input
          iconLeft={<AntDesign name="user" size={24} color="white" />}
          placeholder="Tài khoản"
        />
        <Spacer size={20} />
        <Input
          iconLeft={<Entypo name="lock" size={24} color="white" />}
          secureTextEntry
          placeholder="Mật khẩu"
        />
        <Spacer size={30} />
        <View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
              onPress={() => {
                router.replace("/home");
              }}
            >
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
});
