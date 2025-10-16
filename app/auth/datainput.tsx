// DataInput.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageStyle,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import ViewShot from "react-native-view-shot";

import ActionPhoto from "@/components/ActionPhoto";
import HeaderBack from "@/components/HeaderBack";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/hooks/user";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// selector diameter (change as desired)
const CIRCLE_SIZE = SCREEN_W;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(v, b));

const DataInput = () => {
  const router = useRouter();

  // form fields
  const [userInfoInput, setUserInfoInput] = useState("");
  const [progressInput, setProgressInput] = useState("");
  const [medInsuranceInput, setMedInsuranceInput] = useState("");

  // action photo sheet
  const [openActionPhoto, setOpenActionPhoto] = useState(false);

  // saved avatar (data uri)
  const [avatar, setAvatar] = useState<null | { uri: string; base64?: string }>(
    null
  );

  const { setUserInfo, setProgressList, setMedInsurance, setUserAvatar } =
    useUser();

  // Editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSource, setEditorSource] = useState<null | { uri: string }>(
    null
  );
  const viewShotRef = useRef<any>(null);

  // selector position / refs
  const initialLeft = (SCREEN_W - CIRCLE_SIZE) / 2;
  const initialTop = (SCREEN_H - CIRCLE_SIZE) / 2;
  const [selectorLeft, setSelectorLeft] = useState<number>(initialLeft);
  const [selectorTop, setSelectorTop] = useState<number>(initialTop);
  const selectorPosRef = useRef({ left: initialLeft, top: initialTop });

  // drag anchors for responder-based drag
  const dragStartRef = useRef<{ left: number; top: number } | null>(null);
  const dragAnchorRef = useRef<{ x: number; y: number } | null>(null);

  // image intrinsic/displayed size for resizeMode="contain"
  const [imgIntrinsic, setImgIntrinsic] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [imgDisplayed, setImgDisplayed] = useState<{
    left: number;
    top: number;
    w: number;
    h: number;
  } | null>(null);

  // scale state for pinch inside circle
  const [scale, setScale] = useState<number>(1);
  const baseScaleRef = useRef<number>(1);

  // parse JSON helper (kept from your original)
  const parseJsonSafe = (label: string, raw: string) => {
    if (!raw?.trim()) return { ok: true, value: null };
    try {
      const normalized = raw
        .replace(/\u201C|\u201D/g, '"')
        .replace(/\u2018|\u2019/g, "'");
      const value = JSON.parse(normalized);
      return { ok: true, value };
    } catch (e: any) {
      return { ok: false, error: `${label} JSON is invalid.\n${e.message}` };
    }
  };

  const onSubmit = () => {
    setUserAvatar(avatar);
    const u = parseJsonSafe("Thông tin cá nhân", userInfoInput);
    if (!u.ok) return Alert.alert("Lỗi", u.error);
    const p = parseJsonSafe("Quá trình tham gia", progressInput);
    if (!p.ok) return Alert.alert("Lỗi", p.error);
    const m = parseJsonSafe("Bảo hiểm y tế", medInsuranceInput);
    if (!m.ok) return Alert.alert("Lỗi", m.error);

    const changed = Boolean(
      userInfoInput || progressInput || medInsuranceInput
    );
    if (!changed) return Alert.alert("Chưa nhập dữ liệu");

    if (u.value) setUserInfo(u.value);
    if (p.value) setProgressList(p.value);
    if (m.value && typeof setMedInsurance === "function")
      setMedInsurance(m.value);

    Alert.alert("Thêm dữ liệu thành công");
    router.back();
  };

  // Normalize picker result
  const normalizeImageResult = (res: any) => {
    if (!res) return null;
    if (Array.isArray(res)) {
      const first = res[0];
      return { uri: first?.path, base64: first?.data ?? undefined };
    }
    return { uri: res.path, base64: res.data };
  };

  // pick handlers (open camera/gallery) - no cropping
  const openCamera = async () => {
    ImagePicker.openCamera({
      cropping: false,
      useFrontCamera: false,
      includeBase64: false,
      mediaType: "photo",
    })
      .then((image: any) => handlePickedImage(normalizeImageResult(image)))
      .catch((err) => console.log("openCamera err", err?.message || err));
  };

  const openGallery = async () => {
    ImagePicker.openPicker({
      cropping: false,
      includeBase64: false,
      multiple: false,
      mediaType: "photo",
    })
      .then((image: any) => handlePickedImage(normalizeImageResult(image)))
      .catch((err) => console.log("openGallery err", err?.message || err));
  };

  const handleDeleteAvatar = () => {
    if (!avatar) return;
    Alert.alert("Xóa ảnh", "Bạn có chắc chắn muốn xóa ảnh đại diện này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: () => setAvatar(null) },
    ]);
  };

  // When image picked -> compute intrinsic & displayed rect (contain) and open editor
  const handlePickedImage = (normalized: any) => {
    if (!normalized?.uri) return;
    const uri =
      Platform.OS === "android" && !normalized.uri.startsWith("file://")
        ? "file://" + normalized.uri
        : normalized.uri;
    setEditorSource({ uri });

    Image.getSize(
      uri,
      (w, h) => {
        setImgIntrinsic({ w, h });
        const scaleFactor = Math.min(SCREEN_W / w, SCREEN_H / h);
        const dispW = Math.round(w * scaleFactor);
        const dispH = Math.round(h * scaleFactor);
        const left = Math.round((SCREEN_W - dispW) / 2);
        const top = Math.round((SCREEN_H - dispH) / 2);
        setImgDisplayed({ left, top, w: dispW, h: dispH });

        // reset selector inside displayed bounds
        const minLeft = left;
        const maxLeft = left + dispW - CIRCLE_SIZE;
        const minTop = top;
        const maxTop = top + dispH - CIRCLE_SIZE;
        const centerLeft = clamp(
          (minLeft + maxLeft) / 2,
          minLeft,
          Math.max(minLeft, maxLeft)
        );
        const centerTop = clamp(
          (minTop + maxTop) / 2,
          minTop,
          Math.max(minTop, maxTop)
        );

        selectorPosRef.current = { left: centerLeft, top: centerTop };
        setSelectorLeft(centerLeft);
        setSelectorTop(centerTop);

        // reset scale
        baseScaleRef.current = 1;
        setScale(1);

        setEditorOpen(true);
        setOpenActionPhoto(false);
      },
      (err) => {
        console.warn("Image.getSize failed", err);
        setImgIntrinsic(null);
        setImgDisplayed(null);
        selectorPosRef.current = { left: initialLeft, top: initialTop };
        setSelectorLeft(initialLeft);
        setSelectorTop(initialTop);
        baseScaleRef.current = 1;
        setScale(1);
        setEditorOpen(true);
        setOpenActionPhoto(false);
      }
    );
  };

  // Pinch handlers (two-finger)
  const onPinchEvent = (event: any) => {
    // event.nativeEvent.scale is relative to gesture start
    const s = baseScaleRef.current * (event.nativeEvent.scale ?? 1);
    setScale(Math.max(1, Math.min(s, 6)));
  };

  const onPinchStateChange = (e: PinchGestureHandlerStateChangeEvent) => {
    // if the gesture ended (oldState was ACTIVE), finalize baseScaleRef
    if (e.nativeEvent.oldState === 4) {
      baseScaleRef.current = scale;
    }
  };

  // Save capture (ViewShot)
  const handleSaveFromEditor = async () => {
    try {
      const base64 = await viewShotRef.current.capture();
      const dataUri = `data:image/png;base64,${base64}`;
      setAvatar({ uri: dataUri, base64 });
      setEditorOpen(false);
      setEditorSource(null);
    } catch (e) {
      console.warn("Capture failed", e);
      Alert.alert("Lỗi", "Không thể lưu ảnh. Thử lại.");
    }
  };

  // Drag responder helpers (single-finger)
  const onDragStart = (e: any) => {
    // only for single touch
    if ((e.nativeEvent.touches?.length ?? 1) !== 1) return;
    dragStartRef.current = {
      left: selectorPosRef.current.left,
      top: selectorPosRef.current.top,
    };
    const t = e.nativeEvent.touches?.[0];
    dragAnchorRef.current = { x: t.pageX, y: t.pageY };
  };

  const onDragMove = (e: any) => {
    if (!dragStartRef.current || !dragAnchorRef.current) return;
    const touch = e.nativeEvent.touches[0];
    const dx = touch.pageX - dragAnchorRef.current.x;
    const dy = touch.pageY - dragAnchorRef.current.y;

    let newLeft = dragStartRef.current.left + dx;
    let newTop = dragStartRef.current.top + dy;

    if (imgDisplayed) {
      const minLeft = imgDisplayed.left;
      const maxLeft = imgDisplayed.left + imgDisplayed.w - CIRCLE_SIZE;
      const minTop = imgDisplayed.top;
      const maxTop = imgDisplayed.top + imgDisplayed.h - CIRCLE_SIZE;
      newLeft = clamp(newLeft, minLeft, Math.max(minLeft, maxLeft));
      newTop = clamp(newTop, minTop, Math.max(minTop, maxTop));
    } else {
      newLeft = clamp(newLeft, 0, SCREEN_W - CIRCLE_SIZE);
      newTop = clamp(newTop, 0, SCREEN_H - CIRCLE_SIZE);
    }

    setSelectorLeft(newLeft);
    setSelectorTop(newTop);
  };

  const onDragEnd = () => {
    selectorPosRef.current = { left: selectorLeft, top: selectorTop };
    dragStartRef.current = null;
    dragAnchorRef.current = null;
  };

  // Compute style for the image placed inside the ViewShot (align with background and apply scale)
  const getImageStyleForViewShot = (): ImageStyle => {
    if (!imgDisplayed) {
      return { width: SCREEN_W, height: SCREEN_H } as ImageStyle;
    }
    const {
      left: imgLeftOnScreen,
      top: imgTopOnScreen,
      w: dispW,
      h: dispH,
    } = imgDisplayed;

    // base offsets to align displayed image pixel-for-pixel with the circle top-left
    const baseLeft = -(selectorLeft - imgLeftOnScreen);
    const baseTop = -(selectorTop - imgTopOnScreen);

    // adjust so scaling keeps the same pixel under the selector aligned:
    // left = baseLeft - (scale - 1) * (selectorLeft - imgLeftOnScreen)
    // top  = baseTop  - (scale - 1) * (selectorTop  - imgTopOnScreen)
    const left = baseLeft - (scale - 1) * (selectorLeft - imgLeftOnScreen);
    const top = baseTop - (scale - 1) * (selectorTop - imgTopOnScreen);

    return {
      width: dispW * scale,
      height: dispD * scale,
      left,
      top,
      position: "absolute",
    } as ImageStyle;
  };

  let dispD = 0;
  if (imgDisplayed) dispD = imgDisplayed.h;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBack
          title="Data"
          iconRight={
            <TouchableOpacity onPress={onSubmit}>
              <FontAwesome name="save" size={24} color="white" />
            </TouchableOpacity>
          }
        />
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <View style={styles.container}>
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

          <TouchableOpacity
            style={styles.pickBtn}
            onPress={() => setOpenActionPhoto(true)}
          >
            <Text style={styles.pickBtnText}>Ảnh Đại Diện</Text>
          </TouchableOpacity>

          {avatar ? (
            <View style={styles.previewWrap}>
              <Image
                source={{ uri: avatar.uri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={handleDeleteAvatar}
                style={styles.deleteBtn}
                accessibilityLabel="Xóa ảnh"
              >
                <FontAwesome name="trash" size={20} color="white" />
              </TouchableOpacity>
              <Spacer size={10} />
            </View>
          ) : (
            <View style={{ alignItems: "flex-start", marginTop: 10 }}>
              <Text style={{ color: Colors.border }}>Chưa có ảnh</Text>
            </View>
          )}
        </View>

        <ActionPhoto
          isOpen={openActionPhoto}
          onClose={() => setOpenActionPhoto(false)}
          openGallery={() => openGallery()}
          openCamera={() => openCamera()}
        />
      </ScrollView>

      {/* EDITOR MODAL */}
      <Modal
        visible={editorOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setEditorOpen(false);
          setEditorSource(null);
        }}
      >
        <View style={editorStyles.fullscreen}>
          {/* blurred full-screen background (contain) */}
          {editorSource && (
            <Image
              source={{ uri: editorSource.uri }}
              style={editorStyles.backgroundImage}
              resizeMode="contain"
              blurRadius={8}
            />
          )}

          {/* scale debug */}
          <View style={editorStyles.scaleDebug}>
            <Text style={editorStyles.scaleDebugText}>
              scale: {scale.toFixed(2)}
            </Text>
          </View>

          {/* selector wrapper (absolute) */}
          <View
            style={[
              editorStyles.selectorWrapper,
              { left: selectorLeft, top: selectorTop },
            ]}
            pointerEvents="box-none"
          >
            {/* ViewShot captures circle contents */}
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 1, result: "base64" }}
              style={editorStyles.captureArea}
            >
              <View style={editorStyles.captureMask}>
                {/* Pinch handler wraps the image so two-finger pinches change scale */}
                <PinchGestureHandler
                  onGestureEvent={onPinchEvent}
                  onHandlerStateChange={onPinchStateChange}
                >
                  <View style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
                    {editorSource && imgDisplayed ? (
                      <Image
                        source={{ uri: editorSource.uri }}
                        style={getImageStyleForViewShot()}
                        resizeMode="stretch"
                      />
                    ) : editorSource ? (
                      <Image
                        source={{ uri: editorSource.uri }}
                        style={{ width: SCREEN_W, height: SCREEN_H }}
                        resizeMode="cover"
                      />
                    ) : null}
                  </View>
                </PinchGestureHandler>
              </View>
            </ViewShot>

            {/* Transparent drag handle: single-finger responder; multi-touch passes through */}
            <View
              style={editorStyles.dragHandle}
              pointerEvents="box-only"
              onStartShouldSetResponder={(e) =>
                (e.nativeEvent.touches?.length ?? 1) === 1
              }
              onResponderGrant={onDragStart}
              onResponderMove={onDragMove}
              onResponderRelease={onDragEnd}
              onResponderTerminate={onDragEnd}
            />

            {/* visible border */}
            <View pointerEvents="none" style={editorStyles.circleBorder} />
          </View>

          {/* controls */}
          <View style={editorStyles.controls}>
            <TouchableOpacity
              style={editorStyles.cancelBtn}
              onPress={() => {
                setEditorOpen(false);
                setEditorSource(null);
              }}
            >
              <Text style={{ color: "#333" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={editorStyles.saveBtn}
              onPress={handleSaveFromEditor}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DataInput;

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
    fontSize: 16,
    fontWeight: "bold",
  },

  previewWrap: {
    width: 120,
    height: 120,
    position: "relative",
    borderRadius: 160,
    marginTop: 20,
    // overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 160,
    alignItems: "center",
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

/* editor styles */
const editorStyles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: "black",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_W,
    height: SCREEN_H,
  },
  scaleDebug: { position: "absolute", top: 44, right: 16, zIndex: 40 },
  scaleDebugText: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 6,
  },

  selectorWrapper: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  captureArea: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  captureMask: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  // invisible overlay for single-finger dragging
  dragHandle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "transparent",
    zIndex: 10,
  },

  circleBorder: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
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
