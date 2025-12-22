import { Image, View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

export default function Loading() {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
            }}
        >
            <MaterialIndicator
                size={50}
                color="rgba(30, 188, 251, 1)"
                trackWidth={3}
            />

            <Image
                source={require("@/assets/images/icon/logo.png")}
                style={{
                    position: "absolute",
                    width: 45,
                    height: 45,
                    resizeMode: "contain",
                    marginTop: 2,
                    marginLeft: 2
                }}
            />
        </View>
    )
}