import { useOrganizerStore } from "../../store/organizer";
import { DesksStackScreenProps } from "../../../@types/navigation";

import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDesksQueries } from "../../queries/desks";

type Props = {
  route: DesksStackScreenProps<"Desk">["route"];
};

export const Desk = ({ route }: Props) => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desk">["navigation"]>();

  const deskId = route.params?.deskId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetDesk, useCallNext } = useDesksQueries(currentOrganizationId);

  const { mutate: callNext, isLoading } = useCallNext();

  const { data: desk } = useGetDesk(deskId);

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
      <View className="flex-1 p-4 gap-4 justify-between">
        <Button mode="contained" onPress={handleCallNext}>
          Chamar próximo
        </Button>
      </View>
    </SafeAreaInsetsContainer>
  );
};
