import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

const DataInput = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack title="Nhập dữ liệu" />
      <View style={styles.container}>
        <TextInput
          style={styles.textArea}
          placeholder="Nhập dữ liệu tại đây"
          multiline={true}
          numberOfLines={10} // optional, shows initial height
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: text ? 1 : 0.5 }]}
          onPress={() => {
            router.back();
          }}
          disabled={!text}
        >
          <Text style={styles.txtBtn}>Xác Nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: height / 2, // control height like a textarea
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
