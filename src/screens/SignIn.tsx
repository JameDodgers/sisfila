import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput as RNTextInput,
} from "react-native";

import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useUserQueries } from "../queries/user";
import { Button, Text, TextInput } from "react-native-paper";

const EXPO_CLIENT_ID = process.env.EXPO_CLIENT_ID;
const IOS_CLIENT_ID = process.env.ANDROID_CLIENT_ID;
const ANDROID_CLIENT_ID = process.env.IOS_CLIENT_ID;
const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID;

const AUDIENCE =
  Constants.appOwnership === "expo"
    ? EXPO_CLIENT_ID
    : Platform.OS === "ios"
    ? IOS_CLIENT_ID
    : Platform.OS === "android"
    ? ANDROID_CLIENT_ID
    : Platform.OS === "web"
    ? WEB_CLIENT_ID
    : "";

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
  const navigation = useNavigation();

  const passwordInputRef = useRef<RNTextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  const { useAuthenticateUser, useAuthenticateWithGoogle } = useUserQueries();

  const { mutate: signIn } = useAuthenticateUser();

  const { mutate: signInWithGoogle } = useAuthenticateWithGoogle();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      signInWithGoogle({ oauthToken: id_token, audience: AUDIENCE });
    }
  }, [response]);

  const handleSignIn = () => {
    signIn({ email, password });
  };

  const handleSignInWithGoogle = () => promptAsync();

  return (
    <KeyboardAvoidingView
      className="flex-1 p-4"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View className="items-center">
          <View className="web:sm:w-96">
            <Text variant="displaySmall">Bem-vindo</Text>
            <View className="gap-y-3 mt-5">
              <TextInput
                mode="outlined"
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
              <TextInput
                mode="outlined"
                label="Senha"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSignIn}
                blurOnSubmit={false}
              />
              <View className="gap-y-2 mt-8">
                <Button onPress={handleSignInWithGoogle}>
                  <Text>Entrar com o Google</Text>
                </Button>
                <Button
                  mode="contained-tonal"
                  disabled={!email || !password}
                  onPress={handleSignIn}
                >
                  Entrar
                </Button>
              </View>
              <View className="flex-row mt-6">
                <Text variant="bodyMedium">Ainda não tem uma conta? </Text>
                <Text
                  variant="bodyMedium"
                  className="underline text-indigo-500"
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  Cadastre-se
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
