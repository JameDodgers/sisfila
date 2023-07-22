import { useEffect, useRef, useState } from "react";
import { Platform, TextInput } from "react-native";
import {
  Button,
  Text,
  VStack,
  Center,
  Box,
  Heading,
  FormControl,
  Link,
  Input,
  HStack,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";

import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useUserQueries } from "../queries/user";

const EXPO_CLIENT_ID = process.env.EXPO_PUBLIC_EXPO_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;
const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

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

  const passwordInputRef = useRef<TextInput>();

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
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Bem-vindo
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>E-mail</FormControl.Label>
                <Input
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  blurOnSubmit={false}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  ref={passwordInputRef}
                  returnKeyType="next"
                  autoCapitalize="none"
                  type="password"
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleSignIn}
                  blurOnSubmit={false}
                />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Esqueceu sua senha?
                </Link>
              </FormControl>
              <Button mt="8" onPress={handleSignInWithGoogle}>
                <Text>Entrar com o Google</Text>
              </Button>

              <Button
                mt="2"
                colorScheme="indigo"
                isDisabled={!email || !password}
                onPress={handleSignIn}
              >
                Entrar
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Ainda não tem uma conta?{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  Cadastre-se
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
