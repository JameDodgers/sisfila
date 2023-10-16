import { useOrganizerStore } from "../../store/organizer";
import { DesksStackScreenProps } from "../../../@types/navigation";

import { Avatar, Button, Card, List, Text } from "react-native-paper";
import { View } from "react-native";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDesksQueries } from "../../queries/desks";

import { ScrollView } from "../../libs/styled";
import { Service } from "../../models/Service";

import { CustomListAccordion } from "../../components/CustomListAccordion";
import { ClientItem } from "../../components/ClientItem";
import { CardMenu } from "../../components/CardMenu";

type Props = {
  route: DesksStackScreenProps<"Desk">["route"];
};

const CLIENTS_LIMIT = 20;

export const Desk = ({ route }: Props) => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desk">["navigation"]>();

  const deskId = route.params?.deskId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const {
    useGetDesk,
    useGetLastClientCalledInDesk,
    useCallNext,
    useDeleteDesk,
  } = useDesksQueries(currentOrganizationId);

  const { mutate: callNext, isLoading } = useCallNext();

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
            <Text variant="bodyLarge">{client?.registrationId}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              className="web:self-center"
              disabled={isLoading}
              loading={isLoading}
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
                className="bg-slate-200 border-b border-slate-300"
                title={service.name}
                description={description}
              >
                {service.queues?.map((queue) => {
                  let title = queue.name;

                  if (queue.clients.length > 0) {
                    title += ` (${queue.clients.length} cliente)`;
                  }

                  return (
                    <CustomListAccordion
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
