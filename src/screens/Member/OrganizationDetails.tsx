import { useNavigation } from "@react-navigation/native";

import { useLayoutEffect, useState } from "react";

import { useOrganizationsQueries } from "../../queries/organizations";

import { useOrganizerStore } from "../../store/organizer";
import {
  Button,
  IconButton,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { View } from "react-native";

import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

export const OrganizationDetails = () => {
  const navigation = useNavigation();

  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(link);
    onShowSnackBar();
  };

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetOrganization, useDeleteOrganization } =
    useOrganizationsQueries();

  const { data: organization } = useGetOrganization(currentOrganizationId);

  const { mutate: deleteOrganization } = useDeleteOrganization();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: organization?.name,
    });
  }, [navigation, organization]);

  const handleDeleteOrganization = () => {
    deleteOrganization(currentOrganizationId);
    navigation.navigate("Organizations");
  };

  const link = Linking.createURL(`organization/${currentOrganizationId}`);

  return (
    <>
      <SafeAreaInsetsContainer>
        <View className="flex-1 p-4 web:items-center">
          <View
            style={{ gap: 8 }}
            className="flex-1 ios:justify-between android:justify-between"
          >
            <View
              className="mt-2 flex-row rounded-sm items-center pr-3"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <IconButton
                icon="content-copy"
                size={20}
                onPress={handleCopyLink}
              />
              <Text
                className="flex-1"
                style={{ color: theme.colors.onSurfaceVariant }}
                numberOfLines={1}
              >
                {link}
              </Text>
            </View>
            <Button onPress={handleDeleteOrganization}>
              Excluir organização
            </Button>
          </View>
        </View>
      </SafeAreaInsetsContainer>
      <Portal>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          O link para a fila foi copiado para a área de transferência
        </Snackbar>
      </Portal>
    </>
  );
};
