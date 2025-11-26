import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageZoom from "react-native-image-pan-zoom";
import ViewShot from "react-native-view-shot";

import ActionPhoto from "@/components/ActionPhoto";
import AppText from "@/components/AppText";
import HeaderBack from "@/components/HeaderBack";
import PhotoField from "@/components/PhotoField";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const CIRCLE_SIZE = SCREEN_W;

const DataInput = () => {
  const router = useRouter();

  // --- form fields ---
  const [userInfoInput, setUserInfoInput] = useState("");
  const [progressInput, setProgressInput] = useState("");
  const [medInsuranceInput, setMedInsuranceInput] = useState("");

  // --- photo states ---
  const [avatar, setAvatar] = useState<null | { uri: string; base64?: string }>(null);
  const [medCardPhoto, setMedCardPhoto] = useState<null | { uri: string; base64?: string }>(null);
  const [photoTarget, setPhotoTarget] = useState<"avatar" | "medCard">("avatar");
  const [openActionPhoto, setOpenActionPhoto] = useState(false);

  // --- editor states ---
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSource, setEditorSource] = useState<null | { uri: string }>(null);
  const [imgDisplayed, setImgDisplayed] = useState<{ w: number; h: number } | null>(null);
  const [editorMinScale, setEditorMinScale] = useState(1);
  const viewShotRef = useRef<any>(null);

  const { setUserInfo, setProgressList, setMedInsurance, setUserAvatar, setMedCardImage } = useUser();

  // --- pick image from camera/gallery ---
  const normalizeImageResult = (res: any) => {
    if (!res) return null;
    if (Array.isArray(res)) {
      const first = res[0];
      return { uri: first?.path, base64: first?.data ?? undefined };
    }
    return { uri: res.path, base64: res.data };
  };

  const openCamera = async () => {
    ImagePicker.openCamera({ cropping: false, mediaType: "photo" })
      .then((img) => handlePickedImage(normalizeImageResult(img)))
      .catch(() => { });
  };

  const openGallery = async () => {
    ImagePicker.openPicker({ cropping: false, mediaType: "photo" })
      .then((img) => handlePickedImage(normalizeImageResult(img)))
      .catch(() => { });
  };

  const handlePickedImage = (res: any) => {
    if (!res?.uri) return;
    const uri = Platform.OS === "android" && !res.uri.startsWith("file://") ? "file://" + res.uri : res.uri;

    if (photoTarget === "medCard") {
      setMedCardPhoto(res);
      setEditorOpen(false);
      setEditorSource(null);
      setOpenActionPhoto(false);
      return;
    }

    // prepare editor
    Image.getSize(uri, (w, h) => {
      const scale = Math.min(SCREEN_W / w, SCREEN_H / h);
      setImgDisplayed({ w: w * scale, h: h * scale });
      setEditorSource({ uri });
      setEditorOpen(true);
      setOpenActionPhoto(false);

      // --- tính minScale để ảnh luôn phủ crop circle ---
      const cropSize = CIRCLE_SIZE;
      const minScale = Math.max(cropSize / (w * scale), cropSize / (h * scale));
      setEditorMinScale(minScale);
    }, () => {
      setImgDisplayed({ w: SCREEN_W, h: SCREEN_H });
      setEditorSource({ uri });
      setEditorOpen(true);
      setOpenActionPhoto(false);
      setEditorMinScale(1);
    });
  };

  // --- save from editor ---
  const handleSaveFromEditor = async () => {
    try {
      const base64 = await viewShotRef.current.capture();
      const dataUri = `data:image/png;base64,${base64}`;
      if (photoTarget === "avatar") {
        setAvatar({ uri: dataUri, base64 });
        setUserAvatar({ uri: dataUri, base64 });
      } else {
        setMedCardPhoto({ uri: dataUri, base64 });
        setMedCardImage({ uri: dataUri, base64 });
      }
      setEditorOpen(false);
      setEditorSource(null);
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu ảnh. Thử lại.");
    }
  };

  const onSubmit = () => {
    const changed = Boolean(userInfoInput || progressInput || medInsuranceInput);
    if (!changed) return Alert.alert("Chưa nhập dữ liệu");

    if (userInfoInput) setUserInfo(userInfoInput);
    if (progressInput) setProgressList(progressInput);
    if (medInsuranceInput) setMedInsurance(medInsuranceInput);

    if (avatar) setUserAvatar(avatar);
    if (medCardPhoto) setMedCardImage(medCardPhoto);

    Alert.alert("Lưu dữ liệu thành công");
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBack
          title="Data"
          titleVariant="headingMdRegular"
          iconRight={
            <TouchableOpacity onPress={onSubmit}>
              <FontAwesome name="save" size={24} color="white" />
            </TouchableOpacity>
          }
        />
        <AppText variant="headingMdBold" style={styles.title}>
          Thông tin cá nhân
        </AppText>
        <View style={{ padding: 20 }}>
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
          <Spacer size={50} />

          <PhotoField
            label="Ảnh Đại Diện"
            image={avatar}
            emptyText="Chưa có ảnh"
            onPick={() => {
              setPhotoTarget("avatar");
              setOpenActionPhoto(true);
            }}
            onDelete={() => setAvatar(null)}
          />

          <Spacer size={30} />

          <PhotoField
            label="Ảnh Thẻ Bảo Hiểm Y Tế"
            image={medCardPhoto}
            emptyText="Chưa có ảnh thẻ bảo hiểm y tế"
            previewVariant="full"
            onPick={() => {
              setPhotoTarget("medCard");
              setOpenActionPhoto(true);
            }}
            onDelete={() => setMedCardPhoto(null)}
          />
        </View>

        <ActionPhoto
          isOpen={openActionPhoto}
          onClose={() => setOpenActionPhoto(false)}
          openGallery={openGallery}
          openCamera={openCamera}
        />
      </ScrollView>

      {/* Editor modal */}
      <Modal visible={editorOpen} animationType="fade" transparent>
        <View style={editorStyles.fullscreen}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 1, result: "base64" }}
            style={{ flex: 1 }}
          >
            {editorSource && imgDisplayed && (
              <ImageZoom
                cropWidth={SCREEN_W}
                cropHeight={SCREEN_H}
                imageWidth={imgDisplayed.w}
                imageHeight={imgDisplayed.h}
                minScale={editorMinScale} // ảnh luôn phủ crop circle
                maxScale={10}
                enableCenterFocus={false} // không snap về giữa
                useNativeDriver
              >
                <Image
                  source={{ uri: editorSource.uri }}
                  style={{ width: imgDisplayed.w, height: imgDisplayed.h }}
                  resizeMode="contain"
                />
              </ImageZoom>
            )}
          </ViewShot>

          {/* overlay crop circle */}
          <View style={editorStyles.overlayContainer} pointerEvents="none">
            <View style={editorStyles.overlayDim} />
            <View style={[editorStyles.cropCircle, { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2 }]} />
          </View>

          {/* controls */}
          <View style={editorStyles.controls}>
            <TouchableOpacity
              style={editorStyles.cancelBtn} 
              onPress={() => setEditorOpen(false)}>
              <AppText variant="body" style={{ color: "#333" }}>
                Cancel
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={editorStyles.saveBtn}
              onPress={handleSaveFromEditor}
            >
              <AppText variant="bodyBold" style={{ color: "white" }}>
                Save
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  textArea: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  },
});

const editorStyles = StyleSheet.create({
  fullscreen: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayDim: {
    ...StyleSheet.absoluteFillObject,
  },
  cropCircle: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.95)",
  },

  controls: {
    position: "absolute",
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  saveBtn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: Colors.primary || "#2196F3",
    borderRadius: 8,
  },
});
