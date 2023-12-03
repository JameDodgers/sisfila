import { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

import { DesksStackScreenProps } from "../../../@types/navigation";
import { CardMenu } from "../../components/CardMenu";
import { ClientItem } from "../../components/ClientItem";
import { CustomListAccordion } from "../../components/CustomListAccordion";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { ScrollView } from "../../libs/styled";
import { Service } from "../../models/Service";
import { useDesksQueries } from "../../queries/desks";
import { useMessageStore } from "../../store/message";
import { useOrganizerStore } from "../../store/organizer";

type Props = {
  route: DesksStackScreenProps<"Desk">["route"];
};

const CLIENTS_LIMIT = 20;

export const Desk = ({ route }: Props) => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desk">["navigation"]>();

  const deskId = route.params?.deskId;

  const showMessage = useMessageStore((state) => state.show);

  const { currentOrganizationId = "" } = useOrganizerStore();

  const {
    useGetDesk,
    useGetLastClientCalledInDesk,
    useCallNext,
    useDeleteDesk,
  } = useDesksQueries(currentOrganizationId);

  const { mutate: callNext, isLoading: isCallingNext } = useCallNext();

  const { data: client } = useGetLastClientCalledInDesk(deskId);

  const { data: desk } = useGetDesk(deskId);

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (desk) {
      setServices(desk?.services.filter((service) => service.isOpened));
    }
  }, [desk?.services]);

  const { mutate: deleteDesk } = useDeleteDesk();

  const openDeskSettings = () => {
    navigation.navigate("CreateOrUpdateDesk", { deskId });
  };

  const handleDeleteDesk = () => {
    deleteDesk(deskId);
  };

  const cardMenuOptions = [
    {
      leadingIcon: "cog",
      title: "Configurações",
      onPress: openDeskSettings,
    },
    {
      leadingIcon: "delete",
      title: "Excluir",
      onPress: handleDeleteDesk,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: desk?.name,
    });
  }, [navigation, desk]);

  const handleCallNext = () => {
    callNext(deskId);
  };

  const handleCopyRegistrationId = async () => {
    await Clipboard.setStringAsync(client?.registrationId as string);
    showMessage("Registro copiado para a área de transferência");
  };

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <Card className="m-4 bg-slate-100 web:w-full web:self-center rounded-xl web:max-w-md">
          <Card.Title
            title={client ? "Cliente atual" : "Guichê vazio"}
            right={() => <CardMenu options={cardMenuOptions} />}
          />
          <Card.Content>
            <Text variant="titleMedium">Nome</Text>
            <Text className="mb-2" variant="displaySmall">
              {client?.name}
            </Text>
            <Text variant="titleMedium">Registro</Text>
            <View className="flex-row items-center">
              <Text variant="bodyLarge">{client?.registrationId}</Text>
              <IconButton
                accessibilityLabel="Copiar"
                accessibilityHint="Copiar registro do cliente"
                icon="content-copy"
                size={20}
                onPress={handleCopyRegistrationId}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              className="web:self-center"
              disabled={isCallingNext}
              loading={isCallingNext}
              onPress={handleCallNext}
            >
              Chamar próximo
            </Button>
          </Card.Actions>
        </Card>
        <ScrollView contentContainerStyle="px-4 pb-4 web:w-full web:self-center web:max-w-md">
          {services?.map((service) => {
            const numberQueues = service.queues?.length;

            const description =
              numberQueues > 0
                ? `${numberQueues} fila${numberQueues > 1 ? "s" : ""}`
                : "Nenhuma fila atribuída";

            return (
              <CustomListAccordion
                key={service.id}
                className="bg-slate-200 border-b border-slate-300"
                title={service.name}
                description={description}
              >
                {service.queues?.map((queue) => {
                  let title = queue.name;

                  if (queue.clients.length > 0) {
                    title += ` (${queue.clients.length} cliente${
                      queue.clients.length > 1 ? "s" : ""
                    })`;
                  }

                  return (
                    <CustomListAccordion
                      key={queue.id}
                      title={title}
                      className="bg-slate-100 border-b border-slate-200"
                      description={
                        queue.clients.length > 0 ? (
                          <View className="flex-row-reverse">
                            {queue.clients.length > CLIENTS_LIMIT && (
                              <Avatar.Icon
                                icon="dots-horizontal"
                                className="-mr-3 bg-slate-300 border border-white"
                                size={24}
                              />
                            )}
                            {queue.clients
                              .slice(0, CLIENTS_LIMIT)
                              .reverse()
                              .map((client) => (
                                <Avatar.Text
                                  key={client.id}
                                  className="-mr-3 border border-white"
                                  size={24}
                                  label={client.name.charAt(0)}
                                />
                              ))}
                          </View>
                        ) : (
                          "Nenhum cliente"
                        )
                      }
                    >
                      {queue.clients.map((client, index) => (
                        <ClientItem
                          key={client.id}
                          className="bg-slate-50 border-b border-slate-200"
                          index={index + 1}
                          item={client}
                        />
                      ))}
                    </CustomListAccordion>
                  );
                })}
              </CustomListAccordion>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaInsetsContainer>
  );
};
