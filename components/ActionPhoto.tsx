import { Feather } from "@expo/vector-icons"; // You can switch to Ionicons or others
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ActionPhoto = ({ isOpen, onClose, openGallery, openCamera }: any) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <TouchableOpacity style={styles.item} onPress={openGallery}>
          <Feather name="image" size={24} color="#a1a1aa" style={styles.icon} />
          <Text style={styles.text}>Mở thư viện ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={openCamera}>
          <Feather
            name="camera"
            size={24}
            color="#a1a1aa"
            style={styles.icon}
          />
          <Text style={styles.text}>Mở Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={onClose}>
          <Feather name="x" size={24} color="#f87171" style={styles.icon} />
          <Text style={[styles.text, { color: "#f87171" }]}>Huỷ</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#1f2937",
  },
});

export default ActionPhoto;
