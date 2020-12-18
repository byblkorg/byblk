import React, { useContext, useRef, useState } from "react";
import {
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";

import HeaderImage from "./HeaderImage";
import ContentContainer, { defaultTabs } from "./Content";
import Header from "./Header";
import appcontext from "appcontext";
import createTheme from "theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ({
  title,
  imageSrc,
  renderContent,
}: {
  title: string;
  imageSrc:
    | number
    | ImageURISource
    | ImageURISource[]
    | Animated.Node<ImageSourcePropType>;
  renderContent: () => JSX.Element;
}) => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const [tabs, setTabs] = useState(defaultTabs);
  // const y = useValue(0);
  // const onScroll = onScrollEvent({ y });
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  const [_, setState] = useState(0);
  const y = useSharedValue(0);

  function updateState(val: number) {
    "worklet";
    runOnJS(setState)(val);
  }

  const onScroll = useAnimatedScrollHandler((event) => {
    "worklet";
    updateState(event.contentOffset.y);
    y.value = event.contentOffset.y;
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ctx?.darkmode
            ? theme.colors.dianne
            : theme.colors.gray98,
        },
      ]}
    >
      <HeaderImage {...{ y: y.value, imageSrc }} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <ContentContainer
          // onMeasurement={(index, tab) => {
          //   tabs[index] = tab;
          //   setTabs([...tabs]);
          // }}
          {...{ y: y.value }}
          renderContent={renderContent}
        />
      </Animated.ScrollView>
      <Header {...{ y: y.value, tabs, scrollView, title }} />
    </View>
  );
};
