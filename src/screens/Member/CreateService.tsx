import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { TimePickerModal } from "react-native-paper-dates";
import { format } from "date-fns";
import { useOrganizerStore } from "../../store/organizer";
import { TouchableWithoutFeedback, View } from "react-native";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";

interface FormValues {
  name: string;
}

type hoursAndMinutes = {
  hours: number;
  minutes: number;
};

export const CreateService = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [subscriptionToken, setSubscriptionToken] = useState("");
  const { useCreateService } = useServicesQueries();

  const [isEntireDay, setIsEntireDay] = useState(true);

  const toggleIsEntireDay = () => setIsEntireDay((isEntireDay) => !isEntireDay);

  const [opensAt, setOpensAt] = useState<Date>(
    new Date(new Date().setHours(8, 0, 0))
  );
  const [closesAt, setClosesAt] = useState<Date>(
    new Date(new Date().setHours(17, 0, 0))
  );

  const [startTimePickerModalVisible, setStartTimePickerModalVisible] =
    useState(false);

  const [endTimePickerModalVisible, setEndTimePickerModalVisible] =
    useState(false);

  const { mutate: createService, isLoading } = useCreateService();

  const handleCreateService = ({ name }: FormValues) => {
    const payload = {
      organizationId: currentOrganizationId,
      name,
      subscriptionToken,
      opensAt: (isEntireDay
        ? new Date(opensAt.setHours(0, 0, 1))
        : opensAt
      ).toISOString(),
      closesAt: (isEntireDay
        ? new Date(closesAt.setHours(23, 59, 59))
        : closesAt
      ).toISOString(),
    };

    createService(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const onConfirmStartTimePicker = useCallback(
    ({ hours, minutes }: hoursAndMinutes) => {
      setOpensAt(new Date(opensAt.setHours(hours, minutes)));
      setStartTimePickerModalVisible(false);
    },
    []
  );

  const onDismissStartTimePickerModal = useCallback(() => {
    setStartTimePickerModalVisible(false);
  }, []);

  const onConfirmEndTimePicker = useCallback(
    ({ hours, minutes }: hoursAndMinutes) => {
      setClosesAt(new Date(closesAt.setHours(hours, minutes)));
      setEndTimePickerModalVisible(false);
    },
    []
  );

  const onDismissEndTimePickerModal = useCallback(() => {
    setEndTimePickerModalVisible(false);
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  return (
    <>
      <View className="flex-1 p-4 web:items-center">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateService}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
                <View className="mb-6">
                  <FormikTextInput
                    fieldName="name"
                    mode="outlined"
                    label="Nome"
                  />
                  <TextInput
                    mode="outlined"
                    placeholder="Token"
                    value={subscriptionToken}
                    onChangeText={setSubscriptionToken}
                  />
                  <View className="flex-row mt-6 py-2 items-center justify-between">
                    <Text variant="titleMedium">Dia inteiro</Text>
                    <Switch
                      value={isEntireDay}
                      onValueChange={toggleIsEntireDay}
                    />
                  </View>
                  {!isEntireDay && (
                    <View>
                      <TouchableWithoutFeedback
                        onPress={() => setStartTimePickerModalVisible(true)}
                      >
                        <View className="flex-row py-2 items-center justify-between">
                          <Text variant="titleMedium">Início*</Text>
                          <Text>{format(opensAt, "HH:mm")}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => setEndTimePickerModalVisible(true)}
                      >
                        <View className="flex-row py-2 items-center justify-between">
                          <Text variant="titleMedium">Término*</Text>
                          <Text>{format(closesAt, "HH:mm")}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                </View>
                <Button
                  className="web:self-end"
                  disabled={isLoading}
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  Criar
                </Button>
              </View>
            );
          }}
        </Formik>
      </View>
      <TimePickerModal
        locale="pt"
        visible={startTimePickerModalVisible}
        onDismiss={onDismissStartTimePickerModal}
        onConfirm={onConfirmStartTimePicker}
        hours={opensAt.getHours()}
        minutes={opensAt.getMinutes()}
      />
      <TimePickerModal
        locale="pt"
        visible={endTimePickerModalVisible}
        onDismiss={onDismissEndTimePickerModal}
        onConfirm={onConfirmEndTimePicker}
        hours={closesAt.getHours()}
        minutes={closesAt.getMinutes()}
      />
    </>
  );
};
