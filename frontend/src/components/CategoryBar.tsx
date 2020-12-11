import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Category, SectionHeader } from "components";

export default function CategoryBar({ data = [] }: { data: any[] }) {
  return (
    <View style={{ height: (data.length + 1) * 100 }}>
      {data.map((category) => (
        <>
          <SectionHeader text={category.name} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.subcategoriesContainer}
          >
            {category.subcategories.map((subcategory, index) => (
              <Category
                {...{
                  key: index,
                  title: subcategory,
                  onPress: () => {},
                }}
              />
            ))}
          </ScrollView>
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  subcategoriesContainer: {
    // flex: 1,
  },
});
