import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DataInput = () => {
  const router = useRouter();
  const [userInfoInput, setUserInfoInput] = useState("");
  const [progressInput, setProgressInput] = useState("");
  const [medInsuranceInput, setMedInsuranceInput] = useState("");
  const { setUserInfo, setProgressList, setMedInsurance } = useUser(); // 👈 make sure this exists

  const parseJsonSafe = (label: string, raw: string) => {
    if (!raw?.trim()) return { ok: true, value: null }; // empty is allowed
    try {
      // normalize common paste issues
      const normalized = raw
        .replace(/\u201C|\u201D/g, '"') // smart double quotes
        .replace(/\u2018|\u2019/g, "'"); // smart single quotes
      const value = JSON.parse(normalized);
      return { ok: true, value };
    } catch (e: any) {
      return { ok: false, error: `${label} JSON is invalid.\n${e.message}` };
    }
  };

  const onSubmit = () => {
    const u = parseJsonSafe("Thông tin cá nhân", userInfoInput);
    if (!u.ok) return Alert.alert("Lỗi", u.error);

    const p = parseJsonSafe("Quá trình tham gia", progressInput);
    if (!p.ok) return Alert.alert("Lỗi", p.error);

    const m = parseJsonSafe("Bảo hiểm y tế", medInsuranceInput);
    if (!m.ok) return Alert.alert("Lỗi", m.error);

    const changed = Boolean(
      userInfoInput || progressInput || medInsuranceInput
    );
    if (!changed) return Alert.alert("Chưa nhập dữ liệu");

    if (u.value) setUserInfo(u.value);
    if (p.value) setProgressList(p.value);
    if (m.value && typeof setMedInsurance === "function")
      setMedInsurance(m.value);

    Alert.alert("Thêm dữ liệu thành công");
    router.back();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      keyboardShouldPersistTaps="handled"
    >
      <HeaderBack
        title="Data"
        iconRight={
          <TouchableOpacity onPress={onSubmit}>
            <FontAwesome name="save" size={24} color="white" />
          </TouchableOpacity>
        }
      />
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textArea}
          placeholder="Thông tin người dùng"
          value={userInfoInput}
          onChangeText={setUserInfoInput}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.border}
        />
        <Spacer size={20} />
        <TextInput
          style={styles.textArea}
          placeholder="Quá trình tham gia"
          value={progressInput}
          onChangeText={setProgressInput}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.border}
        />
        <Spacer size={20} />
        <TextInput
          style={styles.textArea}
          placeholder="Bảo hiểm y tế"
          value={medInsuranceInput}
          onChangeText={setMedInsuranceInput}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.border}
        />
      </View>
    </ScrollView>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "space-between" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  textArea: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }), // easier to spot JSON issues
  },
});
