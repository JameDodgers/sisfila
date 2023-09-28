import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useServicesQueries } from "../../queries/services";
import { Button, HelperText, List, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { TimePickerModal } from "react-native-paper-dates";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
} from "date-fns";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";

import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { ServicesStackScreenProps } from "../../../@types/navigation";
import { CustomTextInput } from "../../components/CustomTextInput";

import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { FormikDatePickerInput } from "../../components/FormikDatePickerInput";
import { useQueuesQueries } from "../../queries/queues";
import { CustomListAccordion } from "../../components/CustomListAccordion";

interface FormValues {
  name: string;
  opensAt: Date;
  closesAt: Date;
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

  const { useGetQueues } = useQueuesQueries(currentOrganizationId);

  const { data: serviceQueues = [] } = useGetQueues({
    select: (queues) => queues.filter((queue) => queue.serviceId === serviceId),
  });

  const [sortedServiceQueues, setSortedServiceQueues] = useState(serviceQueues);

  useEffect(() => {
    setSortedServiceQueues(serviceQueues);
  }, [serviceQueues]);

  const { useGetService, useCreateService, useUpdateService } =
    useServicesQueries(currentOrganizationId);

  const { data: service } = useGetService(serviceId);

  const [subscriptionToken, setSubscriptionToken] = useState(
    service?.subscriptionToken || ""
  );

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

  const handleSubmit = ({ name, opensAt, closesAt }: FormValues) => {
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

  const onDismissStartTimePickerModal = useCallback(() => {
    setStartTimePickerModalVisible(false);
  }, []);

  const onDismissEndTimePickerModal = useCallback(() => {
    setEndTimePickerModalVisible(false);
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    opensAt: Yup.date(),
    closesAt: Yup.date(),
  });

  const actionButtonLabel = serviceId ? "Salvar" : "Criar";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: service?.name,
    });
  }, [service?.name]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1 p-4 web:w-full web:self-center web:max-w-sm">
        <Formik
          initialValues={{
            name: service?.name || "",
            opensAt: service
              ? parseISO(service?.opensAt)
              : addDays(new Date(new Date().setHours(8, 0, 0)), 1),
            closesAt: service
              ? parseISO(service?.closesAt)
              : addDays(new Date(new Date().setHours(17, 0, 0)), 1),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, setFieldValue, errors }) => {
            const { opensAt, closesAt } = values;

            const setOpensAt = (date: Date) => setFieldValue("opensAt", date);

            const setClosesAt = (date: Date) => setFieldValue("closesAt", date);

            const onConfirmStartTimePicker = useCallback(
              ({ hours, minutes }: hoursAndMinutes) => {
                let _opensAt = new Date(opensAt.setHours(hours, minutes, 0));

                if (isAfter(_opensAt, closesAt)) {
                  setOpensAt(closesAt);
                  setClosesAt(_opensAt);
                } else {
                  setOpensAt(_opensAt);
                }

                setStartTimePickerModalVisible(false);
              },
              [opensAt, closesAt]
            );
            const onConfirmEndTimePicker = useCallback(
              ({ hours, minutes }: hoursAndMinutes) => {
                let _closesAt = new Date(closesAt.setHours(hours, minutes, 0));

                if (isBefore(_closesAt, opensAt)) {
                  setOpensAt(_closesAt);
                  setClosesAt(opensAt);
                } else {
                  setClosesAt(_closesAt);
                }

                setEndTimePickerModalVisible(false);
              },
              [opensAt, closesAt]
            );

            const onConfirmStartDatePicker = useCallback<
              DatePickerInputProps["onChange"]
            >(
              (date) => {
                if (date) {
                  const _opensAt = replaceHours(opensAt, date);

                  if (isAfter(_opensAt, closesAt)) {
                    if (isSameDay(date, closesAt)) {
                      const _opensAt = replaceHours(closesAt, date);
                      const _closesAt = replaceHours(opensAt, closesAt);

                      setOpensAt(_opensAt);
                      setClosesAt(_closesAt);
                    } else {
                      const _closesAt = replaceHours(closesAt, date);
                      const _opensAt = replaceHours(opensAt, closesAt);

                      setOpensAt(_opensAt);
                      setClosesAt(_closesAt);
                    }
                  } else {
                    setOpensAt(_opensAt);
                  }
                }
              },
              [opensAt, closesAt]
            );
            const onConfirmEndDatePicker = useCallback<
              DatePickerInputProps["onChange"]
            >(
              (date) => {
                if (date) {
                  const _closesAt = replaceHours(closesAt, date);

                  if (isBefore(_closesAt, opensAt)) {
                    if (isSameDay(date, opensAt)) {
                      const _opensAt = replaceHours(closesAt, date);
                      const _closesAt = replaceHours(opensAt, closesAt);

                      setOpensAt(_opensAt);
                      setClosesAt(_closesAt);
                    } else {
                      const _opensAt = replaceHours(opensAt, date);
                      const _closesAt = replaceHours(closesAt, opensAt);

                      setOpensAt(_opensAt);
                      setClosesAt(_closesAt);
                    }
                  } else {
                    setClosesAt(_closesAt);
                  }
                }
              },
              [opensAt, closesAt]
            );

            return (
              <>
                <View className="flex-1 justify-between web:justify-start">
                  <View className="mb-6">
                    <FormikTextInput
                      autoFocus={!serviceId}
                      fieldName="name"
                      label="Nome*"
                    />
                    <CustomTextInput
                      placeholder="Token"
                      value={subscriptionToken}
                      onChangeText={setSubscriptionToken}
                    />
                    <View className="mt-6 flex-row">
                      <FormikDatePickerInput
                        fieldName="opensAt"
                        locale="pt"
                        label="Início*"
                        inputMode="start"
                        onChange={onConfirmStartDatePicker}
                        validRange={{
                          startDate: new Date(),
                        }}
                      />
                      <CustomTextInput
                        className="ml-2 w-[115]"
                        editable={false}
                        value={format(opensAt, "HH:mm")}
                        onPressIn={() => setStartTimePickerModalVisible(true)}
                        right={
                          <TextInput.Icon
                            icon="clock-outline"
                            onPress={() => setStartTimePickerModalVisible(true)}
                          />
                        }
                      />
                    </View>
                    <HelperText type="error">
                      {!!errors.opensAt ? <>{errors.opensAt}</> : " "}
                    </HelperText>
                    <View className="flex-row">
                      <FormikDatePickerInput
                        fieldName="closesAt"
                        locale="pt"
                        label="Término*"
                        inputMode="start"
                        onChange={onConfirmEndDatePicker}
                        validRange={{
                          startDate: new Date(),
                        }}
                      />
                      <CustomTextInput
                        className="ml-2 w-[115]"
                        editable={false}
                        value={format(closesAt, "HH:mm")}
                        onPressIn={() => setEndTimePickerModalVisible(true)}
                        right={
                          <TextInput.Icon
                            icon="clock-outline"
                            onPress={() => setEndTimePickerModalVisible(true)}
                          />
                        }
                      />
                    </View>
                    <HelperText type="error">
                      {!!errors.closesAt ? <>{errors.closesAt}</> : " "}
                    </HelperText>
                    <CustomListAccordion title="Filas">
                      <HelperText type="info">
                        Arraste a fila de maior prioridade para o topo
                      </HelperText>
                      <DraggableFlatList
                        bounces={false}
                        data={sortedServiceQueues}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, drag }) => (
                          <List.Item
                            left={(props) => (
                              <List.Icon
                                {...props}
                                icon="drag-horizontal-variant"
                              />
                            )}
                            onLongPress={drag}
                            title={item.name}
                          />
                        )}
                        onDragEnd={({ data }) => setSortedServiceQueues(data)}
                      />
                    </CustomListAccordion>
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
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
