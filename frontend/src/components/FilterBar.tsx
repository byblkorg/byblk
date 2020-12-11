import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Filter from "./Filter";
import { BusinessType } from "types";

export const defaultState = BusinessType.restaurant;

export default function FilterBar({
  style = "default",
  onSelectFilter,
  onActiveCategoryChange,
}: {
  style?: "default" | "minimal";
  onSelectFilter?: (category: BusinessType) => void;
  onActiveCategoryChange?: (category: BusinessType) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<BusinessType>(
    onSelectFilter ? null : defaultState
  );

  useEffect(() => {
    onActiveCategoryChange && onActiveCategoryChange(activeCategory);
  }, [activeCategory]);

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {Object.values(BusinessType).map((category, index) => {
        return (
          <Filter
            category={category}
            active={onSelectFilter ? true : category === activeCategory}
            key={index}
            onClick={() => {
              onSelectFilter
                ? onSelectFilter(BusinessType[category])
                : setActiveCategory(BusinessType[category]);
            }}
            style={style}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
