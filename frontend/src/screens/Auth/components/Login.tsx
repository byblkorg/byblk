import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { colors } from "theme";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import { useNavigation } from "@react-navigation/native";
import {
  handleLogin,
  americanizePhoneNumber,
  normalizePhoneStringInput,
} from "../functions";

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
  const { theme, isAuthenticated } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const navigation = useNavigation();
  const [state, setState] = useState({
    phone: "",
    password: "",
  });

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function isValid({
    phone,
    password,
  }: {
    phone?: string;
    password?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    return false;
  }

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
          icon="phone"
          placeholder="Enter your phone number"
          validator={() =>
            isValid({
              phone: state.phone,
            })
          }
          onChangeText={(txt) => updateState("phone", txt)}
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Enter your password"
          validator={() =>
            isValid({
              password: state.password,
            })
          }
          onChangeText={(txt) => updateState("password", txt)}
          secureTextEntry
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <Button
          label="Login"
          onPress={() => {
            handleLogin({
              username: americanizePhoneNumber(
                normalizePhoneStringInput(state.phone)
              ),
              password: state.password,
              onSuccess: (res) => {
                isAuthenticated(true);
                navigation.navigate("Welcome");
              },
              onFail: () => {},
            });
          }}
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
