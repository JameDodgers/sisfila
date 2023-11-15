
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";

import { CustomTextInput } from "../../components/CustomTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useOrganizationsQueries } from "../../queries/organizations";
import { useOrganizerStore } from "../../store/organizer";

export const OrganizationDetails = () => {
  const navigation = useNavigation();

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
        <View className="flex-1 p-4 web:w-full web:self-center web:max-w-md">
          <View className="flex-1 justify-between web:justify-start">
            <CustomTextInput
              label="URL para clientes"
              value={link}
              editable={false}
              right={
                <TextInput.Icon
                  icon="content-copy"
                  size={20}
                  onPress={handleCopyLink}
                />
              }
            />

            <Button className="mt-4" onPress={handleDeleteOrganization}>
              Excluir organização
            </Button>
          </View>
        </View>
      </SafeAreaInsetsContainer>
      <Portal>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          A URL da organização foi copiado para a área de transferência
        </Snackbar>
      </Portal>
    </>
  );
};
