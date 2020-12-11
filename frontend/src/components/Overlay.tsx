import React from "react";
import { View, StyleSheet } from "react-native";

export default function Overlay({ children }) {
  return <View style={styles.overlay}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});
