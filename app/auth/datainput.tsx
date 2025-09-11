import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

const DataInput = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack title="Data" />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Thông tin cá nhân
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textArea}
          placeholder="Nhập dữ liệu tại đây"
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
    </ScrollView>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top", // 👈 ensures text starts from the top
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  txtBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
