import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput as RNTextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, Text } from "react-native-paper";
import * as Yup from "yup";

import { FormikTextInput } from "../components/FormikTextInput";
import { useUserQueries } from "../queries/user";

export const SignUp = () => {
  const emailInputRef = useRef<RNTextInput>(null);
  const passwordInputRef = useRef<RNTextInput>(null);
  const confirmPasswordInputRef = useRef<RNTextInput>(null);

  const navigation = useNavigation();

  const { useCreateUser } = useUserQueries();

  const { mutate: signUp, isLoading } = useCreateUser();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/(\w.+\s).+/, "Insira no mínimo 2 nomes")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail"),
    password: Yup.string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required("Insira uma senha"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Senhas não coincidem")
      .required("Insira a senha novamente"),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 p-4 max-w-[90%] w-full self-center web:max-w-sm">
        <Text className="mt-1" variant="headlineSmall">
          Cadastre-se para continuar
        </Text>
        <View className="mt-5">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              signUp(values);
            }}
          >
            {({ handleSubmit }) => {
              return (
                <View>
                  <FormikTextInput
                    autoFocus
                    label="Nome"
                    fieldName="name"
                    returnKeyType="next"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                  />
                  <FormikTextInput
                    ref={emailInputRef}
                    label="E-mail"
                    fieldName="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                  />
                  <FormikTextInput
                    ref={passwordInputRef}
                    label="Senha"
                    fieldName="password"
                    returnKeyType="next"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    secureTextEntry
                    onSubmitEditing={() => {
                      confirmPasswordInputRef.current?.focus();
                    }}
                  />
                  <FormikTextInput
                    ref={confirmPasswordInputRef}
                    label="Confirmar senha"
                    fieldName="confirmPassword"
                    returnKeyType="done"
                    autoCapitalize="none"
                    onSubmitEditing={() => handleSubmit()}
                    secureTextEntry
                  />
                  <Button
                    mode="contained"
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Cadastrar
                  </Button>
                </View>
              );
            }}
          </Formik>

          <View className="flex-row mt-2 self-end">
            <Text className="self-end" variant="bodyMedium">
              Já possui uma conta?{" "}
            </Text>
            <Text
              href="/"
              variant="bodyMedium"
              accessibilityRole="link"
              className="underline text-indigo-500"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              Entrar
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
