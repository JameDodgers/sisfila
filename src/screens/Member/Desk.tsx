import { useOrganizerStore } from "../../store/organizer";
import { DesksStackScreenProps } from "../../../@types/navigation";

import { Button } from "react-native-paper";
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

  const { useGetDesks, useCallNext } = useDesksQueries();

  const { mutate: callNext } = useCallNext();

  const { data: desk } = useGetDesks(currentOrganizationId, {
    select: (data) => data.find((item) => item.id === deskId),
  });

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
