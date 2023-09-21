import { useCallback, useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import { Button, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { addDays, format, isAfter, isBefore, parseISO } from "date-fns";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { ServicesStackScreenProps } from "../../../@types/navigation";

interface FormValues {
  name: string;
}

type hoursAndMinutes = {
  hours: number;
  minutes: number;
};

const replaceHours = (sourceDate: Date, targetDate: Date) =>
  new Date(
    targetDate.setHours(sourceDate.getHours(), sourceDate.getMinutes(), 0)
  );

type Props = ServicesStackScreenProps<"CreateOrUpdateService">;

export const CreateOrUpdateService = ({ route, navigation }: Props) => {
  const serviceId = route.params?.serviceId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetService, useCreateService, useUpdateService } =
    useServicesQueries(currentOrganizationId);

  const { data: service } = useGetService(serviceId);

  const [subscriptionToken, setSubscriptionToken] = useState(
    service?.subscriptionToken || ""
  );

  const [opensAt, setOpensAt] = useState<Date>(
    service
      ? parseISO(service?.opensAt)
      : addDays(new Date(new Date().setHours(8, 0, 0)), 1)
  );
  const [closesAt, setClosesAt] = useState<Date>(
    service
      ? parseISO(service?.closesAt)
      : addDays(new Date(new Date().setHours(17, 0, 0)), 1)
  );

  const [startDatePickerModalVisible, setStartDatePickerModalVisible] =
    useState(false);

  const [endDatePickerModalVisible, setEndDatePickerModalVisible] =
    useState(false);

  const [startTimePickerModalVisible, setStartTimePickerModalVisible] =
    useState(false);

  const [endTimePickerModalVisible, setEndTimePickerModalVisible] =
    useState(false);

  const { mutate: createService, isLoading: isCreatingService } =
    useCreateService();

  const { mutate: updateService, isLoading: isUpdatingService } =
    useUpdateService();

  const isLoading = isCreatingService || isUpdatingService;

  const onSuccess = () => navigation.goBack();

  const handleSubmit = ({ name }: FormValues) => {
    const basePayload = {
      name,
      subscriptionToken,
      guestEnrollment: false,
      opensAt: opensAt.toISOString(),
      closesAt: closesAt.toISOString(),
    };

    if (serviceId) {
      const payload = {
        ...basePayload,
        serviceId,
      };
      updateService(payload, { onSuccess });
    } else {
      const payload = {
        ...basePayload,
        organizationId: currentOrganizationId,
      };
      createService(payload, { onSuccess });
    }
  };

  const onConfirmStartTimePicker = useCallback(
    ({ hours, minutes }: hoursAndMinutes) => {
      let _opensAt = new Date(opensAt.setHours(hours, minutes, 0));

      if (isAfter(_opensAt, replaceHours(opensAt, closesAt))) {
        _opensAt = replaceHours(opensAt, closesAt);

        const _closesAt = new Date(closesAt.setHours(hours, minutes));

        setClosesAt(_closesAt);
      }
      setOpensAt(_opensAt);

      setStartTimePickerModalVisible(false);
    },
    [opensAt, closesAt]
  );

  const onDismissStartTimePickerModal = useCallback(() => {
    setStartTimePickerModalVisible(false);
  }, []);

  const onConfirmEndTimePicker = useCallback(
    ({ hours, minutes }: hoursAndMinutes) => {
      let _closesAt = new Date(closesAt.setHours(hours, minutes, 0));

      if (isBefore(_closesAt, replaceHours(closesAt, opensAt))) {
        _closesAt = replaceHours(closesAt, opensAt);

        const _opensAt = new Date(opensAt.setHours(hours, minutes));

        setOpensAt(_opensAt);
      }

      setClosesAt(_closesAt);

      setEndTimePickerModalVisible(false);
    },
    [opensAt, closesAt]
  );

  const onDismissEndTimePickerModal = useCallback(() => {
    setEndTimePickerModalVisible(false);
  }, []);

  const onConfirmStartDatePicker = useCallback<SingleChange>(
    ({ date }) => {
      if (date) {
        if (isAfter(date, closesAt)) {
          const _closesAt = replaceHours(date, closesAt);

          const _opensAt = replaceHours(closesAt, opensAt);

          setClosesAt(_closesAt);
          setOpensAt(_opensAt);
        } else {
          const _opensAt = replaceHours(opensAt, date);

          setOpensAt(_opensAt);
        }
      }

      setStartDatePickerModalVisible(false);
    },
    [opensAt, closesAt]
  );

  const onDismissStartDatePicker = useCallback(() => {
    setStartDatePickerModalVisible(false);
  }, []);

  const onConfirmEndDatePicker = useCallback<SingleChange>(
    ({ date }) => {
      if (date) {
        if (isBefore(date, opensAt)) {
          const _opensAt = replaceHours(date, opensAt);

          const _closesAt = replaceHours(opensAt, closesAt);

          setClosesAt(_closesAt);
          setOpensAt(_opensAt);
        } else {
          const _closesAt = replaceHours(closesAt, date);
          setClosesAt(_closesAt);
        }
      }

      setEndDatePickerModalVisible(false);
    },
    [opensAt, closesAt]
  );

  const onDismissEndDatePicker = useCallback(() => {
    setEndDatePickerModalVisible(false);
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  const actionButtonLabel = serviceId ? "Salvar" : "Criar";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: service?.name,
    });
  }, [service?.name]);

  return (
    <>
      <SafeAreaInsetsContainer>
        <View className="flex-1 p-4 web:w-full web:self-center web:max-w-sm">
          <Formik
            initialValues={{
              name: service?.name || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => {
              return (
                <View className="flex-1 justify-between web:justify-start">
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
                    <Text className="mt-6" variant="titleMedium">
                      Início
                    </Text>
                    <View className="flex-row justify-between">
                      <TouchableWithoutFeedback
                        onPress={() => setStartDatePickerModalVisible(true)}
                      >
                        <View className="p-2 flex-1">
                          <Text variant="titleSmall">
                            {format(opensAt, "EEE, d 'de' MMMM 'de' yyyy")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => setStartTimePickerModalVisible(true)}
                      >
                        <View className="p-2">
                          <Text variant="titleSmall">
                            {format(opensAt, "HH:mm")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <Text variant="titleMedium">Término</Text>
                    <View className="flex-row justify-between">
                      <TouchableWithoutFeedback
                        onPress={() => setEndDatePickerModalVisible(true)}
                      >
                        <View className="p-2 flex-1">
                          <Text variant="titleSmall">
                            {format(closesAt, "EEE, d 'de' MMMM 'de' yyyy")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => setEndTimePickerModalVisible(true)}
                      >
                        <View className="p-2">
                          <Text variant="titleSmall">
                            {format(closesAt, "HH:mm")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <Button
                    className="web:self-end"
                    loading={isLoading}
                    disabled={isLoading}
                    mode="contained"
                    onPress={() => handleSubmit()}
                  >
                    {actionButtonLabel}
                  </Button>
                </View>
              );
            }}
          </Formik>
        </View>
      </SafeAreaInsetsContainer>
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={startDatePickerModalVisible}
        validRange={{
          startDate: new Date(),
        }}
        onDismiss={onDismissStartDatePicker}
        date={opensAt}
        onConfirm={onConfirmStartDatePicker}
      />
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={endDatePickerModalVisible}
        validRange={{
          startDate: new Date(),
        }}
        onDismiss={onDismissEndDatePicker}
        date={closesAt}
        onConfirm={onConfirmEndDatePicker}
      />
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
