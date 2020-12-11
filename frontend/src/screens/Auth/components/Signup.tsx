import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import AuthContext from "../authcontext";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  marginBottomContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function Signup() {
  const { theme } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
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
          Create Account
        </Text>

        <Text style={styles.text}>We're happy to have you!</Text>
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
        <TextInput
          icon="lock"
          placeholder="Confirm your password"
          validator={() => true}
          secureTextEntry
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <Button
          label="Signup"
          onPress={() => console.log("yer")}
          variant="primary"
        />
      </View>
    </>
  );
}
