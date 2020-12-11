import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import appcontext from "appcontext";
import createTheme, { colors } from "theme";

type CardProps = {
  onPress?: () => void;
  style?: "small" | "default";
};

export default function Card({
  onPress = () => {},
  style = "default",
}: CardProps) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const backgroundColor = ctx?.darkmode ? colors.darkCyan : "transparent";

  return (
    <TouchableOpacity
      style={[styles.container, style === "small" && styles.containerSmall]}
      {...{ onPress }}
    >
      <View style={[styles.imageContainer, { backgroundColor }]}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.image}
        />
      </View>
      <View
        style={[
          styles.details,
          {
            backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            theme.fonts.cotham,
            theme.typography.fontM,
            {
              marginBottom:
                style === "default" ? theme.spacing.margin.md : null,
              color: theme.colors.defaultFontColor,
            },
          ]}
        >
          La Brioche
        </Text>
        <Text
          style={{
            color: theme.colors.defaultFontColor,
          }}
        >
          Linden, Bakery
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 300,
    borderRadius: 10,
    margin: 10,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  containerSmall: {
    height: 200,
    width: 180,
    margin: 3,
  },
  imageContainer: {
    height: "65%",
    padding: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
  },
  details: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "transparent",
  },
});
