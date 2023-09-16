import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput as RNTextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserQueries } from "../queries/user";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export const SignUp = () => {
  const nameInputRef = useRef<RNTextInput>(null);
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
        <View className="gap-y-3 mt-5">
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
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              return (
                <View>
                  <TextInput
                    mode="outlined"
                    label="Nome"
                    error={touched.email && !!errors.email}
                    ref={nameInputRef}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />
                  <HelperText
                    type="error"
                    visible={touched.email && !!errors.email}
                  >
                    {errors.name}
                  </HelperText>
                  <TextInput
                    mode="outlined"
                    label="E-mail"
                    error={touched.email && !!errors.email}
                    ref={emailInputRef}
                    value={values.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />
                  <HelperText
                    type="error"
                    visible={touched.email && !!errors.email}
                  >
                    {errors.email}
                  </HelperText>
                  <TextInput
                    mode="outlined"
                    label="Senha"
                    error={touched.password && !!errors.password}
                    ref={passwordInputRef}
                    value={values.password}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    onSubmitEditing={() => {
                      confirmPasswordInputRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                    secureTextEntry
                  />
                  <HelperText
                    type="error"
                    visible={touched.password && !!errors.password}
                  >
                    {errors.password}
                  </HelperText>
                  <TextInput
                    mode="outlined"
                    label="Confirmar senha"
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    ref={confirmPasswordInputRef}
                    value={values.confirmPassword}
                    returnKeyType="done"
                    autoCapitalize="none"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    onSubmitEditing={() => handleSubmit()}
                    secureTextEntry
                  />
                  <HelperText
                    type="error"
                    visible={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  >
                    {errors.confirmPassword}
                  </HelperText>
                  <Button
                    mode="contained"
                    className="mt-8"
                    loading={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Cadastrar
                  </Button>
                </View>
              );
            }}
          </Formik>
          <View className="mt-6 flex-row">
            <Text variant="bodyMedium">Já possui uma conta? </Text>
            <Text
              variant="bodyMedium"
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
