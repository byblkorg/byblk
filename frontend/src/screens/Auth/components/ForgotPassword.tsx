import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { colors } from "theme";
import { AuthState } from "../types";
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

export default function ForgotPassword() {
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
          Forgot Password
        </Text>

        <Text style={styles.text}>Reset your password</Text>
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="phone"
          placeholder="Enter your phone number"
          validator={() => false}
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <Button
          label="Reset Password"
          onPress={() => console.log("yer")}
          variant="primary"
        />
      </View>
    </>
  );
}
