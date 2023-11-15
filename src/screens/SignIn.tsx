import { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput as RNTextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import { Button, Text } from "react-native-paper";
import * as Yup from "yup";

import { FormikTextInput } from "../components/FormikTextInput";
import { useUserQueries } from "../queries/user";

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

type FormValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const navigation = useNavigation();

  const passwordInputRef = useRef<RNTextInput>(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  const { useAuthenticateUser, useAuthenticateWithGoogle } = useUserQueries();

  const { mutate: signIn, isLoading } = useAuthenticateUser();

  const { mutate: signInWithGoogle } = useAuthenticateWithGoogle();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      signInWithGoogle({ oauthToken: id_token, audience: AUDIENCE });
    }
  }, [response]);

  const handleSignInWithGoogle = () => promptAsync();

  const handleSignIn = (values: FormValues) => {
    signIn(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Insira seu e-mail"),
    password: Yup.string().required("Insira a senha"),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 p-4 max-w-[90%] w-full self-center web:max-w-sm">
        <Text variant="displaySmall">Bem-vindo</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ handleSubmit }) => {
            return (
              <View className="mt-5">
                <FormikTextInput
                  fieldName="email"
                  label="E-mail"
                  keyboardType="email-address"
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  blurOnSubmit={false}
                />
                <FormikTextInput
                  ref={passwordInputRef}
                  fieldName="password"
                  label="Senha"
                  returnKeyType="next"
                  secureTextEntry
                  autoComplete="current-password"
                  onSubmitEditing={() => handleSubmit()}
                  blurOnSubmit={false}
                />
                <Button
                  mode="contained"
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => handleSubmit()}
                >
                  Entrar
                </Button>
                <Text className="self-end mt-2" variant="bodyMedium">
                  Ainda não tem uma conta?{" "}
                  <Text
                    variant="bodyMedium"
                    className="underline text-indigo-500"
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                  >
                    Cadastre-se
                  </Text>
                </Text>
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};
