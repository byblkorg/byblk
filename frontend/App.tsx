import React, { useState, useMemo } from "react";
import { StatusBar, View } from "react-native";
import AppContext from "./appcontext";
import { useFonts } from "@use-expo/font";
import createTheme from "theme";
import { Discover, Business, WelcomeSpinner, Auth, Results } from "screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer as CustomDrawer } from "components";

export type RootStackParamList = {
  Auth: undefined;
  Welcome: undefined;
  Home: undefined;
  Search: {
    searchQuery?: string;
  };
  Business: {
    cream: boolean;
  };
  Results: ResultsProps;
};

type ResultsProps = {
  data: any[];
};

const Stack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

const Home = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => null,
    }}
    initialRouteName="Auth"
  >
    <Stack.Screen name="Auth" component={Auth} />

    <Stack.Screen
      name="Welcome"
      component={WelcomeSpinner}
      // options={{
      //   header: () => null,
      // }}
    />

    <Stack.Screen name="Home" component={Discover} />

    <Stack.Screen name="Business" component={Business} />

    <Stack.Screen name="Results" component={Results} />
  </Stack.Navigator>
);
export default function App() {
  const [darkmode, setDarkMode] = useState(true);
  const [fontsLoaded] = useFonts({
    CooperHewitt: require("./assets/fonts/CooperHewitt-Heavy.otf"),
    CothamSans: require("./assets/fonts/CothamSans.otf"),
    Office: require("./assets/fonts/OfficeCodePro-Light.otf"),
    Work: require("./assets/fonts/WorkSans-ExtraBold.otf"),
  });

  const theme = useMemo(() => createTheme(darkmode), []);

  if (fontsLoaded) {
    return (
      <AppContext.Provider
        value={{
          darkmode,
          setDarkMode,
          theme,
        }}
      >
        <NavigationContainer>
          <StatusBar
            barStyle={darkmode ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background(darkmode)}
          />
          <Drawer.Navigator
            initialRouteName="Home"
            drawerPosition="right"
            drawerContent={() => <CustomDrawer />}
          >
            <Drawer.Screen name="Home" component={Home} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  } else {
    return null;
  }
}
