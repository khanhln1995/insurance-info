import { Colors } from "@/constants/Colors";
import React from "react";
import { KeyboardType, StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  iconLeft?: React.ReactNode;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: (text: string) => void;
  placeholder?: string;
}

const Input = ({
  iconLeft,
  keyboardType = "default",
  secureTextEntry = false,
  placeholder,
  value,
  setValue,
}: InputProps) => {
  return (
    <View style={styles.vInput}>
      {iconLeft && <View style={styles.vLeft}>{iconLeft}</View>}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.border}
        value={value}
        onChangeText={(text) => {
          if (setValue) {
            setValue(text);
          }
        }}
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
    backgroundColor: "white",
    height: 36.84,
    borderBottomRightRadius: 4.41,
    borderTopRightRadius: 4.41,
  },
  vLeft: {
    backgroundColor: Colors.primary,
    width: 36.84,
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: Colors.border,
    flex: 1,  
    height: '100%',
    width: '100%',
    fontSize: 15.4,
    paddingHorizontal: 13.32,
    paddingVertical: 7.96,
    borderBottomRightRadius: 4.41,
    borderTopRightRadius: 4.41,
  },
});
