import React, { useContext, useRef, useState } from "react";
import {
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
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
  const y = useValue(0);
  const onScroll = onScrollEvent({ y });
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
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
      <HeaderImage {...{ y, imageSrc }} />
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
          {...{ y }}
          renderContent={renderContent}
        />
      </Animated.ScrollView>
      <Header {...{ y, tabs, scrollView, title }} />
    </View>
  );
};
