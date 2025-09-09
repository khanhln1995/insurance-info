import SafeArea from "@/components/SafeArea";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const Home = () => {
  const router = useRouter();
  return (
    <SafeArea>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text>Home</Text>
        <View>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
              onPress={() => {
                console.log("Logout");
                router.replace("/auth");
              }}
            >
              Đăng Xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
});
