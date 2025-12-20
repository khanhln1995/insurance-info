// app/_layout.tsx
import SafeArea from "@/components/SafeArea";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store/index";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // 👇 Cast to any to bypass TS check safely
      (Text as any).defaultProps = (Text as any).defaultProps || {};
      (Text as any).defaultProps.style = [
        (Text as any).defaultProps.style || {},
        { fontFamily: "Inter_400Regular" },
      ];

      (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
      (TextInput as any).defaultProps.style = [
        (TextInput as any).defaultProps.style || {},
        { fontFamily: "Inter_400Regular" },
      ];

      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  const stackOptions: any = {
    headerShown: false,
    gestureEnabled: true,
    fullScreenGestureEnabled: true,
    gestureDirection: "horizontal",
    animation: "simple_push",
    cardStyleInterpolator: ({ current, layouts }: any) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }),
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeArea>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={stackOptions} />
          </ThemeProvider>
        </SafeArea>
      </Provider>
    </GestureHandlerRootView>
  );
}
