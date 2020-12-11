import appcontext from "appcontext";
import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text, Switch } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import createTheme, { colors } from "theme";

export default function Drawer() {
  const { darkmode, setDarkMode } = useContext(appcontext);
  const theme = createTheme(darkmode);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background(darkmode),
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background(darkmode),
          },
        ]}
      >
        <View style={[styles.block, { alignSelf: "center" }]}>
          <Text style={[theme.typography.title, { fontSize: 24 }]}>
            Ashton Morris
          </Text>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={[theme.typography.title, styles.link]}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[theme.typography.title, styles.link]}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[theme.typography.title, styles.link]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
          <Switch
            trackColor={{ false: colors.brass, true: colors.oxford }}
            thumbColor={darkmode ? colors.brass : colors.slate}
            onValueChange={() => setDarkMode(!darkmode)}
            value={darkmode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  block: {
    marginBottom: 10,
    padding: 15,
  },
  link: {
    fontSize: 18,
    color: colors.emerald,
    margin: 5,
  },
});
