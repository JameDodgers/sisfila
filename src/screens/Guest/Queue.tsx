import { useQueuesQueries } from "../../queries/guest/queues";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { Text } from "react-native-paper";
import { View } from "react-native";

import { ClientItem } from "../../components/ClientItem";
import { useServicesQueries } from "../../queries/guest/services";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { StyledFlatList } from "../../libs/styled";

type Props = {
  route: RootNavigatorScreenProps<"Queue">["route"];
};

export const Queue = ({ route }: Props) => {
  const { queueId, serviceId, queueName, registrationId } = route.params;

  const { getClientPositionInService } = useServicesQueries();

  const { data } = getClientPositionInService({
    serviceId,
    registrationId,
  });

  const { useGetQueue } = useQueuesQueries();

  const { data: queue } = useGetQueue(queueId);

  if (data && data?.position === 0) {
    return (
      <View className="flex-1 items-center">
        <Text variant="displaySmall">Chegou a sua vez! 🎉</Text>
        {data?.desk && (
          <Text variant="bodyLarge">
            Dirija-se para o guichê{" "}
            <Text className="font-semibold">
              {data?.desk?.name.toLowerCase()}
            </Text>
          </Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <StyledFlatList
          contentContainerStyle="p-4 web:m-4 web:bg-slate-100 web:rounded-md web:w-full web:self-center web:max-w-md"
          ListHeaderComponent={
            <View>
              <View className="items-center mb-4">
                <Text variant="headlineLarge">{queueName}</Text>
                <Text variant="labelLarge">{queue?.description}</Text>
              </View>
              <View className="mb-8 flex-row items-center justify-between">
                <View className="items-center">
                  <Text variant="labelLarge">Posição geral</Text>
                  <Text variant="bodyMedium">{data?.position?.toString()}</Text>
                </View>
                <View className="items-center">
                  <Text variant="labelLarge">Aguandando</Text>
                  <Text variant="bodyMedium">{queue?.clients.length}</Text>
                </View>
              </View>
              <View className="mb-8">
                <Text variant="titleSmall">Último chamado</Text>
                {queue?.lastClientCalled && (
                  <Text variant="headlineLarge">
                    {queue?.lastClientCalled.name}
                  </Text>
                )}
              </View>
              {queue && queue?.clients.length > 0 && (
                <Text variant="titleSmall">Aguardando</Text>
              )}
            </View>
          }
          data={queue?.clients}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ClientItem key={item.id} index={index + 1} item={item} />
          )}
        />
      </View>
    </SafeAreaInsetsContainer>
  );
};
