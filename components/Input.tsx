import { Colors } from "@/constants/Colors";
import React from "react";
import { KeyboardType, StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  iconLeft?: React.ReactNode;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  placeholder?: string;
}

const Input = ({
  iconLeft,
  keyboardType = "default",
  secureTextEntry = false,
  placeholder,
}: InputProps) => {
  return (
    <View style={styles.vInput}>
      {iconLeft && <View style={styles.vLeft}>{iconLeft}</View>}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  vInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  vLeft: {
    backgroundColor: Colors.primary,
    padding: 9,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: Colors.border,
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});
