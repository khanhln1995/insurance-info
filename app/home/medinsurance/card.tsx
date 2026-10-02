import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import SwipeBackContainer from "@/components/SwipeBackContainer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

const MAX_WIDTH = 314;
const MAX_HEIGHT = 498;
const MIN_HEIGHT = 198;

const MedCardImageScreen = () => {
  const { medCardImage } = useUser();

  const [imgSize, setImgSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const loadLocal = () => {
      if (!medCardImage?.uri) return;

      const src = medCardImage.uri;

      try {
        const resolved = Image.resolveAssetSource(src);

        if (resolved?.width && resolved?.height) {
          setImgSize({
            width: resolved.width,
            height: resolved.height,
          });
        }
      } catch (error) {
        console.log("Cannot resolve local image:", error);
      }
    };

    if (!medCardImage?.uri) {
      setImgSize(null);
      return;
    }

    Image.getSize(
      medCardImage.uri,
      (width, height) => {
        setImgSize({
          width,
          height,
        });
      },
      () => {
        loadLocal();
      }
    );
  }, [medCardImage]);

  const getScaledSize = () => {
    if (!imgSize) {
      return {
        frameWidth: MAX_WIDTH,
        frameHeight: MIN_HEIGHT,
        imageWidth: MAX_WIDTH,
        imageHeight: MIN_HEIGHT,
        rotation: 0,
      };
    }

    const { width: iw, height: ih } = imgSize;

    const isPortrait = ih > iw;

    if (isPortrait) {
      return {
        frameWidth: MAX_WIDTH,
        frameHeight: MIN_HEIGHT,
        imageWidth: MIN_HEIGHT,
        imageHeight: MAX_WIDTH,
        rotation: 90,
      };
    }
    return {
      frameWidth: MAX_WIDTH,
      frameHeight: MIN_HEIGHT,
      imageWidth: MAX_WIDTH,
      imageHeight: MIN_HEIGHT,
      rotation: 0,
    };
  };

  const scaledSize = getScaledSize();

  const router: any = useRouter();

  return (
    <>
      <SwipeBackContainer
        header={
          <HeaderBack
            title="THẺ BHYT BẢN ĐIỆN TỬ"
            textColor="#34689E"
            textStyle={{ fontSize: 17.58 }}
            onGoBack={() => router.replace("/home/medinsurance")}
            styleContainer={{ backgroundColor: "#fff", marginBottom: 20  }}
            colors={["#fff", "#fff"]}
            isGoBack={true}
            titleVariant="subheading"
            iconLeft={
              <Entypo
                name="chevron-left"
                size={33}
                color={Colors.primary}
              />
            }
          />
        }
        enabled={false}
        overlayColor="#fff"
        onLogout={() => router.replace("/auth")}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            {medCardImage?.uri ? (
              <View
                style={[
                  styles.cardFrame,
                  {
                    width: scaledSize.frameWidth,
                    height: scaledSize.frameHeight,
                  },
                ]}
              >
                <Image
                  source={{ uri: medCardImage.uri }}
                  style={{
                    width: scaledSize.imageWidth,
                    height: scaledSize.imageHeight,
                    transform: [
                      {
                        rotate: `${scaledSize.rotation}deg`,
                      },
                    ],
                  }}
                  resizeMode="stretch"
                />
              </View>
            ) : (
              <AppText
                variant="label"
                style={styles.emptyText}
              >
                Chưa có ảnh thẻ bảo hiểm y tế. Vui lòng thêm ảnh trong phần
                nhập dữ liệu.
              </AppText>
            )}
          </View>
        </View>
      </SwipeBackContainer>
    </>
  );
};

export default MedCardImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgScreen,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardFrame: {
    marginTop: 82,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  emptyText: {
    textAlign: "center",
    color: Colors.txtDark,
  },
});