import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MAX_WIDTH = 268.25;
const MAX_HEIGHT = 469.25;

const MedCardImageScreen = () => {
  const { medCardImage } = useUser();
  const [rotation, setRotation] = useState(0);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);

  const toggleRotation = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  useEffect(() => {
    const loadLocal = () => {
      const src = medCardImage.uri;
      const resolved = Image.resolveAssetSource(src);
      setImgSize({ width: resolved.width, height: resolved.height });
    };

    if (medCardImage?.uri) {
      Image.getSize(
        medCardImage.uri,
        (w, h) => setImgSize({ width: w, height: h }),
        () => loadLocal()
      );
    } else {
      loadLocal();
    }
  }, [medCardImage]);

  // Hàm tính kích thước ảnh theo rotation và max
  const getScaledSize = () => {
    if (!imgSize) return { width: MAX_WIDTH, height: MAX_HEIGHT };
    const { width: iw, height: ih } = imgSize;
    const rotated = rotation % 180 !== 0;
    let natW = rotated ? ih : iw;
    let natH = rotated ? iw : ih;

    if (natW > MAX_WIDTH) {
      const scale = MAX_WIDTH / natW;
      natW = MAX_WIDTH;
      natH = Math.round(natH * scale);
    }

    if (natH > MAX_HEIGHT) {
      const scale = MAX_HEIGHT / natH;
      natH = MAX_HEIGHT;
      natW = Math.round(natW * scale);
    }
    
    return { width: rotated ? natH : natW, height:rotated ? natW : natH };
  };

  const scaledSize = getScaledSize();

  return (
    <View style={styles.container}>
      <HeaderBack
        title="Thẻ bảo hiểm y tế"
        textColor="#34689E"
        titleVariant="subheading"
        styleContainer={{ backgroundColor: "#fff" }}
        iconLeft={<Entypo name="chevron-thin-left" size={28} color={Colors.primary} />}
      />

      <View style={styles.content}>
        {medCardImage?.uri && (
          <TouchableOpacity style={styles.rotateBtn} onPress={toggleRotation}>
            <Image
              source={require("../../../assets/images/clip.png")}
              style={{ width: 33.49, height: 33.49 }}
            />
          </TouchableOpacity>
        )}
        {medCardImage?.uri ? (
          <View
            style={[
              styles.cardFrame,
              {
                width: 268.25,
                height: 469.25,
              },
            ]}
          >
            <Image
              source={{ uri: medCardImage.uri }}
              // source={require("../../../assets/images/1111111.png")}
              style={{
                width: scaledSize.width,
                height: scaledSize.height,
                transform: [{ rotate: `${rotation}deg` }],
              }}
              resizeMode="contain"
            />
          </View>
        ) : (
          <AppText variant="label" style={styles.emptyText}>
            Chưa có ảnh thẻ bảo hiểm y tế. Vui lòng thêm ảnh trong phần nhập dữ liệu.
          </AppText>
        )}
      </View>
    </View>
  );
};

export default MedCardImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardFrame: {
    marginTop: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  rotateBtn: {
    position: "absolute",
    top: 24,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.txtDark,
  },
});
