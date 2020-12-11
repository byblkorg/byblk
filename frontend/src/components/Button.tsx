import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { colors } from "theme";

type ButtonProps = {
  variant: "default" | "primary";
  label: string;
  onPress: () => void;
};

export default function Button({ variant, label, onPress }: ButtonProps) {
  const backgroundColor =
    variant === "primary" ? colors.emerald : "rgba(12, 13, 52, 0.05)";
  const color = variant === "primary" ? "white" : "#0C0D34";

  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <View>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
    </RectButton>
  );
}

Button.defaultProps = {
  variant: "default",
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
  },
});
