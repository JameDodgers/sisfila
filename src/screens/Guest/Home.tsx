import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

type FormValues = {
  organizationId: string;
};

export const Home = () => {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<RootNavigatorScreenProps<"Home">["navigation"]>();

  const theme = useTheme();

  const handleOpenOrganization = (values: FormValues) => {
    navigation.navigate("Organization", {
      id: values.organizationId,
    });
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handleDismiss = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
  };

  const validationSchema = Yup.object().shape({
    organizationId: Yup.string().required("Insira o id da organização"),
  });

  return (
    <SafeAreaInsetsContainer>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View
          style={{
            paddingTop: insets.top,
          }}
          className="flex-1"
        >
          <View className="p-4 web:self-center max-w-[90%] w-full self-center web:max-w-sm">
            <Formik
              initialValues={{
                organizationId: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleOpenOrganization}
            >
              {({ handleSubmit }) => {
                return (
                  <View>
                    <Text
                      style={{ color: theme.colors.primary }}
                      className="mb-12 self-center"
                      variant="headlineLarge"
                    >
                      Sisfila 2
                    </Text>
                    <Text className="mb-2" variant="titleSmall">
                      Cole o ID da organização abaixo ou abra o link
                      compartilhado pelo coordenador
                    </Text>
                    <View>
                      <FormikTextInput
                        fieldName="organizationId"
                        mode="outlined"
                        style={{ textAlign: "auto" }}
                      />
                      <Button
                        className="mb-2"
                        mode="contained"
                        onPress={() => handleSubmit()}
                      >
                        Avançar
                      </Button>
                      <Text variant="bodyMedium" className="self-end">
                        É um coordenador?{" "}
                        <Text
                          variant="bodyMedium"
                          className="text-indigo-500"
                          onPress={handleSignIn}
                        >
                          Faça login
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaInsetsContainer>
  );
};
