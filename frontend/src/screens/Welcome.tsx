import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Slide, SLIDE_HEIGHT, SubSlide, Dot } from "components";
import {
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from "react-native-redash";
import Animated, { divide } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "App";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

type WelcomeSpinnerProps = {
  navigation: ProfileScreenNavigationProp;
};

const { width } = Dimensions.get("window");

const slides = [
  {
    subtitle: "So relaxed",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    color: "#0f1924",
  },
  {
    subtitle: "So playful",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    color: "#ce8277",
  },
  {
    subtitle: "So Eccentric",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    color: "#526073",
  },
  {
    subtitle: "So Funky",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    color: "#caaba6",
  },
];

const BORDER_RADIUS = 75;

export default function WelcomeSpinner({ navigation }: WelcomeSpinnerProps) {
  const { x } = useScrollHandler();

  const onScroll = onScrollEvent({ x });

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  const scroll = useRef<Animated.ScrollView>(null);

  console.log(x);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <View>
          <Slide />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />

        <View style={[styles.footerContent, {}]}>
          <View style={styles.pagination}>
            {slides.map((slide, index) => (
              <Dot key={index} {...{ index }} currentIndex={divide(x, width)} />
            ))}
          </View>

          <Animated.ScrollView
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={1}
            {...{ onScroll }}
            ref={scroll}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;

              return (
                <SubSlide
                  {...{ subtitle, description, last }}
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.replace("Home");
                    } else {
                      if (scroll.current) {
                        scroll.current
                          .getNode()
                          .scrollTo({ x: width * (index + 1), animated: true });
                      }
                    }
                  }}
                />
              );
            })}
          </Animated.ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
