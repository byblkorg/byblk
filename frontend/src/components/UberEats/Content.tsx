/* eslint-disable max-len */
import React, { useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import { MIN_HEADER_HEIGHT } from "./Header";
import appcontext from "appcontext";
import createTheme, { colors } from "theme";

const { height } = Dimensions.get("window");

export const defaultTabs = [];
const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontSize: 14,
  },
  divider: {
    height: 0.5,
    width: "85%",
    alignSelf: "flex-start",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  link: {
    color: colors.emerald,
  },
});

export interface TabModel {
  name: string;
  anchor: number;
}

interface ContentProps {
  y: Animated.Node<number>;
  renderContent: () => JSX.Element;
  onMeasurement?: (index: number, tab: TabModel) => void;
}

export default ({ y, renderContent, onMeasurement }: ContentProps) => {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <>
      <View style={styles.placeholder} />

      <Animated.View
        style={[
          styles.section,
          {
            opacity,
            backgroundColor: ctx?.darkmode
              ? theme.colors.dianne
              : theme.colors.gray98,
          },
        ]}
      >
        <View style={styles.info}>
          <Text style={[styles.text, { color: theme.colors.defaultFontColor }]}>
            1530 Franklin Street Hillside, NJ 07205
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.link}>(999) 888-5555</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.link}>www.internet.com</Text>
        </View>
      </Animated.View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: ctx?.darkmode
              ? theme.colors.brass
              : theme.colors.slate,
          },
        ]}
      />

      <View style={{ height }}>{renderContent && renderContent()}</View>
    </>
  );
};
