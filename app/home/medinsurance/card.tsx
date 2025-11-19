import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const MedCardImageScreen = () => {
  const { medCardImage } = useUser();
  const [rotation, setRotation] = useState(0);

  const toggleRotation = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <View style={styles.container}>
      {/* <HeaderBack title="Thẻ bảo hiểm y tế" titleVariant="headingMdRegular" /> */}
      <HeaderBack
        title="Thẻ bảo hiểm y tế"
        textColor='#34689E'
        titleVariant="subheading"
        styleContainer={{ backgroundColor: "#fff" }}
        iconLeft={
          <Entypo name="chevron-thin-left" size={28} color={Colors.primary} />
        }
      />

      <View style={styles.content}>
        { medCardImage?.uri &&
          <TouchableOpacity style={styles.rotateBtn} onPress={toggleRotation}>
            <Image
              source={require('../../../assets/images/clip.png')}
              style={{  width: 33.49, height: 33.49 }}
            />
            
          </TouchableOpacity>
        }
        {medCardImage?.uri ? (
          <>
            <View style={styles.cardFrame}>
              <Image
                source={{ uri: medCardImage.uri }}
                style={[
                  { width: '100%' },
                  { transform: [{ rotate: `${rotation}deg` }] },
                ]}
                resizeMode="contain"
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
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardFrame: {
    width: '100%',
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
  note: {
    textAlign: "center",
    color: Colors.border,
  },
});

