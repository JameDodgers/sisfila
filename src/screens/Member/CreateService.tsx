import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import { Button, Switch, Text, TextInput } from "react-native-paper";

import { DatePickerModal } from "react-native-paper-dates";
import { format, parseISO } from "date-fns";
import { RangeChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";

export const CreateService = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [name, setName] = useState("");
  const [subscriptionToken, setSubscriptionToken] = useState("");
  const [guestEnrollment, setguestEnrollment] = useState(false);
  const { useCreateService } = useServicesQueries();
  const [opensAt, setOpensAt] = useState<Date | undefined>();
  const [closesAt, setClosesAt] = useState<Date | undefined>();

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
      organizationId: currentOrganizationId,
      name,
      subscriptionToken,
      guestEnrollment,
      opensAt: opensAt.toISOString(),
      closesAt: closesAt.toISOString(),
    };

    createService(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const toggleguestEnrollment = () => setguestEnrollment((value) => !value);

  return (
    <>
      <View className="flex-1 p-4">
        <View className="flex-1 gap-y-6">
          <TextInput
            mode="outlined"
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            mode="outlined"
            placeholder="Token"
            value={subscriptionToken}
            onChangeText={setSubscriptionToken}
          />
          <View className="flex-row items-center justify-between">
            <Text variant="titleMedium">Entrada anônima</Text>
            <Switch
              value={guestEnrollment}
              onValueChange={toggleguestEnrollment}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text variant="titleMedium">Intervalo</Text>
              <Text variant="bodySmall">
                {!opensAt && !closesAt
                  ? "Nenhuma data selecionada"
                  : [
                      opensAt ? format(opensAt, "dd/MM/yyyy") : "",
                      closesAt ? format(closesAt, "dd/MM/yyyy") : "",
                    ].join(" - ")}
              </Text>
            </View>
            <Button mode="contained-tonal" onPress={() => setOpen(true)}>
              Escolher datas
            </Button>
          </View>
        </View>
        <Button mode="contained" onPress={handleCreateService}>
          Criar
        </Button>
      </View>
      <DatePickerModal
        locale="pt"
        startLabel="Início"
        endLabel="Término"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={opensAt}
        endDate={closesAt}
        onConfirm={onConfirm}
      />
    </>
  );
};
