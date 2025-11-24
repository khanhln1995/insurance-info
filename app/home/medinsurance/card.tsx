import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MAX_WIDTH = 272;
const MAX_HEIGHT = 476;
const MIN_HEIGHT = 155.43;

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
    } 
    // else {
      // loadLocal();
    // }
  }, [medCardImage]);

  const getScaledSize = () => {
    if (!imgSize) return { width: MAX_WIDTH, height: MAX_HEIGHT, resizeMode: "stretch" };

    const { width: iw, height: ih } = imgSize;
    const rotated = rotation % 180 !== 0;
    const isNatPortrait = ih >= iw;
    const isDisplayPortrait = rotated ? !isNatPortrait : isNatPortrait;

    return {
      width: MAX_WIDTH,
      height: isDisplayPortrait ? MAX_HEIGHT : MIN_HEIGHT,
      resizeMode: "cover",
    };
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
        {medCardImage?.uri ? (
          <>
            <TouchableOpacity style={styles.rotateBtn} onPress={toggleRotation}>
              <Image
                source={require("../../../assets/images/clip.png")}
                style={{ width: 33.49, height: 33.49 }}
              />
            </TouchableOpacity>
            <View style={[styles.cardFrame, {
              width: scaledSize?.width,
              height: scaledSize?.height
            }]}>
              <Image
                source={{ uri: medCardImage.uri }}
                // source={require("../../../assets/images/1111111.png")}
                style={{
                  width: rotation % 180 === 0 ? scaledSize.width : scaledSize.height,
                  height: rotation % 180 === 0 ? scaledSize.height : scaledSize.width,
                  transform: [{ rotate: `${rotation}deg` }],
                }}
                resizeMode={scaledSize.resizeMode as any}
              />
            </View>
          </>
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
    overflow: "hidden",
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
