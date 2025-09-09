import { View } from "react-native";

type SpacerProps = {
  size?: number;
  horizontal?: boolean;
  color?: string;
};

const Spacer = ({
  size = 8,
  horizontal = false,
  color = "transparent",
}: SpacerProps) => (
  <View
    style={
      horizontal
        ? { width: size, backgroundColor: color }
        : { height: size, backgroundColor: color }
    }
  />
);

export default Spacer;
