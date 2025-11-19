import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

import AppText from "@/components/AppText";
import { Colors } from "@/constants/Colors";

type PhotoValue = { uri: string; base64?: string } | null;

interface PhotoFieldProps {
  label: string;
  onPick: () => void;
  image: PhotoValue;
  onDelete?: () => void;
  emptyText: string;
  previewVariant?: "circle" | "full";
  containerStyle?: ViewStyle;
}

const PhotoField = ({
  label,
  onPick,
  image,
  onDelete,
  emptyText,
  previewVariant = "circle",
  containerStyle,
}: PhotoFieldProps) => {
  const isCircle = previewVariant === "circle";

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.pickBtn} onPress={onPick}>
        <AppText variant="bodyBold" style={styles.pickBtnText}>
          {label}
        </AppText>
      </TouchableOpacity>

      {image ? (
        <View style={isCircle ? styles.previewCircle : styles.previewFull}>
          <Image
            source={{ uri: image.uri }}
            style={isCircle ? styles.previewCircleImage : styles.previewFullImage}
            resizeMode="cover"
          />
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              style={styles.deleteBtn}
              accessibilityLabel={`Xóa ${label}`}
            >
              <FontAwesome name="trash" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={{ alignItems: "flex-start", marginTop: 10 }}>
          <AppText variant="body" style={{ color: Colors.border }}>
            {emptyText}
          </AppText>
        </View>
      )}
    </View>
  );
};

export default PhotoField;

const styles = StyleSheet.create({
  pickBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  pickBtnText: {
    color: "white",
    textAlign: "center",
  },
  previewCircle: {
    width: 120,
    height: 120,
    position: "relative",
    borderRadius: 160,
    marginTop: 20,
  },
  previewCircleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 160,
  },
  previewFull: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 16,
    marginTop: 20,
    position: "relative",
    overflow: "hidden",
  },
  previewFullImage: {
    width: "100%",
    height: "100%",
  },
  deleteBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "white",
  },
});

