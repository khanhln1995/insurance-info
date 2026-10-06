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
  useWindowDimensions,
  View,
} from "react-native";

const MedCardImageScreen = () => {
  const { medCardImage } = useUser();
  const { width: screenWidth } = useWindowDimensions();
  const router = useRouter();

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!medCardImage?.uri) {
      setImageSize(null);
      return;
    }

    Image.getSize(
      medCardImage.uri,
      (width, height) => {
        setImageSize({ width, height });
      },
      () => {
        try {
          const resolved = Image.resolveAssetSource(medCardImage.uri);

          if (resolved?.width && resolved?.height) {
            setImageSize({
              width: resolved.width,
              height: resolved.height,
            });
          }
        } catch (error) {
          console.log("Cannot get image size:", error);
        }
      }
    );
  }, [medCardImage?.uri]);

  const getImageStyle = () => {
    if (!imageSize) {
      return {
        containerWidth: screenWidth,
        containerHeight: 200,
        imageWidth: screenWidth,
        imageHeight: 200,
        rotation: "0deg" as const,
      };
    }

    const {
      width: originalWidth,
      height: originalHeight,
    } = imageSize;

    const isPortrait = originalHeight > originalWidth;

    if (isPortrait) {
      const imageHeightAfterRotate =
        screenWidth * (originalWidth / originalHeight);

      return {
        // Kích thước vùng hiển thị SAU KHI xoay
        containerWidth: screenWidth,
        containerHeight: imageHeightAfterRotate,

        // Kích thước Image TRƯỚC KHI xoay
        imageWidth: imageHeightAfterRotate,
        imageHeight: screenWidth,

        rotation: "90deg" as const,
      };
    }

    /**
     * ẢNH NGANG
     *
     * Chiều ngang gốc chính là originalWidth.
     */
    const imageHeight =
      screenWidth * (originalHeight / originalWidth);

    return {
      containerWidth: screenWidth,
      containerHeight: imageHeight,

      imageWidth: screenWidth,
      imageHeight,

      rotation: "0deg" as const,
    };
  };

  const imageStyle = getImageStyle();

  return (
    <SwipeBackContainer
      header={
        <HeaderBack
          title="THẺ BHYT BẢN ĐIỆN TỬ"
          textColor="#34689E"
          textStyle={{ fontSize: 17.58 }}
          onGoBack={() => router.replace("/home/medinsurance")}
          styleContainer={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          colors={["#fff", "#fff"]}
          isGoBack
          titleVariant="subheading"
          iconLeft={
            <Entypo
              name="chevron-left"
              size={36}
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
        {medCardImage?.uri && imageSize ? (
          <View style={styles.content}>
            <View
              style={{
                width: imageStyle.containerWidth,
                height: imageStyle.containerHeight,
                alignItems: "center",
                justifyContent: "center",

                // Dịch toàn bộ ảnh lên trên 8px
                transform: [{ translateY: -8 }],
              }}
            >
              <Image
                source={{ uri: medCardImage.uri }}
                style={{
                  width: imageStyle.imageWidth,
                  height: imageStyle.imageHeight,
                  transform: [
                    {
                      rotate: imageStyle.rotation,
                    },
                  ],
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <AppText
              variant="label"
              style={styles.emptyText}
            >
              Chưa có ảnh thẻ bảo hiểm y tế. Vui lòng thêm ảnh trong phần
              nhập dữ liệu.
            </AppText>
          </View>
        )}
      </View>
    </SwipeBackContainer>
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  emptyText: {
    textAlign: "center",
    color: Colors.txtDark,
  },
});