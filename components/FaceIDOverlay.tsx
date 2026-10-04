import React, { useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet } from 'react-native';

const GIF = require('../assets/images/faceid2.gif');
const GIF_DURATION_MS = 3000;

interface Props {
  visible: boolean;
  onComplete: () => void;
}

export default function FaceIDOverlay({ visible, onComplete }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onComplete();
      });
    }, GIF_DURATION_MS - 500);

    return () => {
      clearTimeout(timer);
      opacity.stopAnimation();
      opacity.setValue(0);
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Image source={GIF} style={styles.gif} resizeMode="contain" />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -31,
  },
  gif: {
    width: 236,
    height: 236,
  },
});
