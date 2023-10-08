import { useNavigation } from "@react-navigation/native";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Home = () => {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<RootNavigatorScreenProps<"Home">["navigation"]>();

  const theme = useTheme();

  const [organizationId, setOrganizationId] = useState("");

  const handleOpenOrganization = () => {
    navigation.navigate("Organization", {
      id: organizationId,
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
            <Text
              style={{ color: theme.colors.primary }}
              className="mb-12 self-center"
              variant="headlineLarge"
            >
              Sisfila 2
            </Text>
            <Text className="mb-2" variant="titleSmall">
              Cole o ID da organização abaixo ou abra o link compartilhado pelo
              coordenador
            </Text>
            <View>
              <TextInput
                style={{ textAlign: "auto" }}
                mode={Platform.OS === "web" ? "flat" : "outlined"}
                label="ID"
                className="mb-4"
                value={organizationId}
                onChangeText={setOrganizationId}
              />
              <Button
                className="mb-2"
                mode="contained"
                onPress={handleOpenOrganization}
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaInsetsContainer>
  );
};
