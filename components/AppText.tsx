import React from "react";
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

export type TextVariant =
  | "smallBold"
  | "small"
  | "subheading"
  | "headingMdBold"
  | "headingMd"
  | "bodyBold"
  | "body"
  | "textLoginBtn"
  | "micro"
  | "microBold"
  | "labelBold"
  | "label"
  | "headingMdRegular"
  | "caption"
  | "captionBold";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
}

const variantMap: Record<TextVariant, TextStyle> = {
  small: {
    fontWeight: "400",
    fontSize: 13.4,
  },
  smallBold: {
    fontWeight: "700",
    fontSize: 13.4,
  },
  subheading: {
    fontWeight: "700",
    fontSize: 19.85,
  },
  headingMdBold: {
    fontWeight: "700",
    fontSize: 14.74,
  },
  headingMd: {
    fontWeight: "400",
    fontSize: 14.74,
  },
  bodyBold: {
    fontWeight: "500",
    fontSize: 15.4,
  },
  body: {
    fontWeight: "400",
    fontSize: 15.4,
  },
  textLoginBtn: {
    fontWeight: "600",
    fontSize: 17.41,
  },
  micro: {
    fontWeight: "400",
    fontSize: 12.06,
  },
  microBold: {
    fontWeight: "500",
    fontSize: 12.06,
  },
  labelBold: {
    fontWeight: "600",
    fontSize: 14.07,
  },
  label: {
    fontWeight: "400",
    fontSize: 14.07,
  },
  headingMdRegular: {
    fontWeight: "400",
    fontSize: 18.08,
  },
  caption: {
    fontWeight: "400",
    fontSize: 11,
  },
  captionBold: {
    fontWeight: "500",
    fontSize: 11,
  },
};

const variantStyles = StyleSheet.create(variantMap);

const AppText = ({ variant = "body", style, ...rest }: AppTextProps) => {
  return (
    <Text
      style={[variantStyles[variant], style]}
      {...rest}
    />
  );
};

export default AppText;

