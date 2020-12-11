import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { colors } from "theme";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  marginBottomContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function Login() {
  const { theme } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <Text
          style={[
            theme.typography.title,
            theme.typography.fontL,
            { color: "black" },
            styles.text,
          ]}
        >
          Welcome back
        </Text>

        <Text style={styles.text}>Login below with your credentials</Text>
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          validator={() => false}
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Enter your password"
          validator={() => true}
          secureTextEntry
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <Button
          label="Login"
          onPress={() => navigation.navigate("Welcome")}
          variant="primary"
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setAuthState(AuthState.ForgotPassword);
        }}
      >
        <Text style={[styles.text, { color: colors.emerald }]}>
          Forgot password
        </Text>
      </TouchableOpacity>
    </>
  );
}
