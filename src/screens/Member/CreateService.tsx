import { Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import { Button, Input } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import { Button as PaperButton, Switch } from "react-native-paper";

import { DatePickerModal } from "react-native-paper-dates";
import { useDrawer } from "../../contexts/drawer";
import { RangeChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";

export const CreateService = () => {
  const navigation = useNavigation();

  const { organizationId } = useDrawer();

  const [name, setName] = useState("");
  const [subscriptionToken, setSubscriptionToken] = useState("");
  const [guestEnrollment, setguestEnrollment] = useState(false);
  const { useCreateService } = useServicesQueries();
  const [opensAt, setOpensAt] = useState<Date | undefined>(undefined);
  const [closesAt, setClosesAt] = useState<Date | undefined>(undefined);

  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback<RangeChange>(
    ({ startDate, endDate }) => {
      setOpen(false);
      setOpensAt(startDate);
      setClosesAt(endDate);
    },
    [setOpen, setOpensAt, setClosesAt]
  );

  const { mutate: createService } = useCreateService();

  const handleCreateService = () => {
    if (!name || !subscriptionToken || !opensAt || !closesAt) {
      return;
    }

    const payload = {
      organizationId,
      name,
      subscriptionToken,
      guestEnrollment,
      opensAt,
      closesAt,
    };

    createService(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const toggleguestEnrollment = () => setguestEnrollment((value) => !value);

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1} space={3}>
        <Input
          size="2xl"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <Input
          size="2xl"
          placeholder="Token"
          value={subscriptionToken}
          onChangeText={setSubscriptionToken}
        />
        <Switch value={guestEnrollment} onValueChange={toggleguestEnrollment} />
        <PaperButton onPress={() => setOpen(true)}>
          <Text>Escolher datas</Text>
        </PaperButton>

        <DatePickerModal
          locale="pt-BR"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={opensAt}
          endDate={closesAt}
          onConfirm={onConfirm}
        />
      </VStack>
      <Button onPress={handleCreateService}>Criar</Button>
    </VStack>
  );
};
