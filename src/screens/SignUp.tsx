import { useRef } from "react";
import { Platform, TextInput } from "react-native";

import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Link,
  Text,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/auth";

export const SignUp = () => {
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { loading, signUp, request } = useAuth();

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
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Bem-vindo
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Cadastre-se para continuar!
            </Heading>
            <VStack space={3} mt="5">
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
                    <VStack>
                      <FormControl isInvalid={touched.name && !!errors.name}>
                        <FormControl.Label>Nome</FormControl.Label>
                        <Input
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
                        <FormControl.ErrorMessage>
                          {errors.name}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={touched.email && !!errors.email}>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input
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
                        <FormControl.ErrorMessage>
                          {errors.email}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={touched.password && !!errors.password}
                      >
                        <FormControl.Label>Senha</FormControl.Label>
                        <Input
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
                          type="password"
                        />
                        <FormControl.ErrorMessage>
                          {errors.password}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                      >
                        <FormControl.Label>Confirmar senha</FormControl.Label>
                        <Input
                          ref={confirmPasswordInputRef}
                          value={values.confirmPassword}
                          returnKeyType="done"
                          autoCapitalize="none"
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          onSubmitEditing={() => handleSubmit()}
                          type="password"
                        />
                        <FormControl.ErrorMessage>
                          {errors.confirmPassword}
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <Button
                        mt="8"
                        colorScheme="indigo"
                        isDisabled={!request}
                        isLoading={loading}
                        onPress={() => handleSubmit()}
                      >
                        Cadastrar
                      </Button>
                    </VStack>
                  );
                }}
              </Formik>
              <HStack mt="6">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Já possui uma conta?{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                >
                  Entrar
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
