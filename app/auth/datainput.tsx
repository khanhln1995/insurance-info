import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DataInput = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [userInfoInput, setUserInfoInput] = useState("");
  const [progressInput, setProgressInput] = useState("");
  const [medInsuranceInput, setMedInsuranceInput] = useState("");
  const { setUserInfo, setProgressList } = useUser();

  const onSubmit = () => {
    if (userInfoInput.length > 0) {
      setUserInfo(JSON.parse(userInfoInput));
    }
    if (progressInput.length > 0) {
      setProgressList(JSON.parse(progressInput));
    }
    if (medInsuranceInput.length > 0) {
      setMedInsuranceInput(JSON.parse(medInsuranceInput));
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack
        title="Data"
        iconRight={
          <TouchableOpacity onPress={onSubmit}>
            <FontAwesome name="save" size={24} color="white" />
          </TouchableOpacity>
        }
      />
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
          placeholder="Thông tin người dùng"
          value={userInfoInput}
          onChangeText={setUserInfoInput}
          multiline
        />
        <Spacer size={20} />
        <TextInput
          style={styles.textArea}
          placeholder="Quá trình tham gia"
          value={progressInput}
          onChangeText={setProgressInput}
          multiline
        />
        <Spacer size={20} />
        <TextInput
          style={styles.textArea}
          placeholder="Bảo hiểm y tế"
          value={medInsuranceInput}
          onChangeText={setMedInsuranceInput}
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
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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
