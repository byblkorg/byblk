import appcontext from "appcontext";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Platform,
} from "react-native";
import { createTheme } from "theme";
import {
  Card,
  CategoryBar,
  FilterBar,
  defaultFilterBarState,
  SearchBar,
  SectionHeader,
} from "components";
import { ScreenProps } from "types";
import { Feather as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Results({
  route,
  navigation: { navigate, goBack },
}: ScreenProps<"Results">) {
  const data = route.params?.data ?? [];
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const [activeCategory, updateActiveCategory] = useState(
    defaultFilterBarState
  );
  const filteredData =
    data.filter((categories) => categories.name === activeCategory)[0]
      ?.categories ?? [];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background(ctx?.darkmode) },
      ]}
    >
      <TouchableOpacity onPress={() => goBack()}>
        <Icon
          name="arrow-left"
          size={30}
          color={ctx?.darkmode ? "white" : "black"}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background(ctx?.darkmode) },
        ]}
      >
        <View style={styles.section}>
          <SearchBar />
        </View>

        <View>
          <FilterBar
            style="minimal"
            onActiveCategoryChange={updateActiveCategory}
          />
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          numColumns={2}
          contentContainerStyle={{
            alignItems: Platform.OS !== "web" ? "center" : undefined,
            padding: 8,
          }}
          ListHeaderComponent={
            filteredData.length && (
              <View>
                <CategoryBar data={filteredData} />
                <SectionHeader text={"All"} />
              </View>
            )
          }
          renderItem={({ item, index }) => (
            <Card
              onPress={() => navigate("Business")}
              key={index}
              style="small"
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 8,
  },
});
