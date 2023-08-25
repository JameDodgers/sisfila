import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { DatePickerModal } from "react-native-paper-dates";
import { format } from "date-fns";
import { RangeChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";

interface FormValues {
  name: string;
  opensAt?: Date;
  closesAt?: Date;
}

export const CreateService = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [subscriptionToken, setSubscriptionToken] = useState("");
  const { useCreateService } = useServicesQueries();

  const [open, setOpen] = useState(false);

  const closeDatePickerModal = () => {
    setOpen(false);
  };

  const { mutate: createService } = useCreateService();

  const handleCreateService = ({ name, opensAt, closesAt }: FormValues) => {
    if (!opensAt || !closesAt) return;

    const payload = {
      organizationId: currentOrganizationId,
      name,
      subscriptionToken,
      opensAt: opensAt.toISOString(),
      closesAt: closesAt.toISOString(),
    };

    createService(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    opensAt: Yup.date().required("Selecione uma data de início"),
    closesAt: Yup.date().required("Selecione uma data de término"),
  });

  return (
    <View className="flex-1 p-4 web:items-center">
      <Formik
        initialValues={{
          name: "",
          opensAt: undefined,
          closesAt: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateService}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
        }) => {
          const onConfirm = useCallback<RangeChange>(
            ({ startDate, endDate }) => {
              setOpen(false);
              setFieldValue("opensAt", startDate);
              setFieldValue("closesAt", endDate);
            },
            [setOpen]
          );

          const onDismiss = () => {
            closeDatePickerModal();
            setFieldTouched("opensAt", true);
            setFieldTouched("closesAt", true);
          };

          return (
            <>
              <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
                <View>
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
                  <View className="flex-row items-center justify-between mt-6">
                    <View>
                      <Text variant="titleMedium">Intervalo*</Text>
                      <Text variant="bodySmall">
                        {!values.opensAt && !values.closesAt
                          ? "Nenhuma data selecionada"
                          : [
                              values.opensAt
                                ? format(values.opensAt, "dd/MM/yyyy")
                                : "",
                              values.closesAt
                                ? format(values.closesAt, "dd/MM/yyyy")
                                : "",
                            ].join(" - ")}
                      </Text>
                    </View>
                    <Button
                      mode="contained-tonal"
                      onPress={() => setOpen(true)}
                    >
                      Escolher datas
                    </Button>
                  </View>
                  <HelperText
                    padding="none"
                    type={errors.opensAt || errors.closesAt ? "error" : "info"}
                  >
                    {((touched.opensAt || touched.closesAt) &&
                      (errors.opensAt || errors.closesAt)) ||
                      " "}
                  </HelperText>
                </View>
                <Button
                  className="web:self-end"
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  Criar
                </Button>
              </View>
              <DatePickerModal
                locale="pt"
                startLabel="Início"
                endLabel="Término"
                mode="range"
                visible={open}
                validRange={{
                  startDate: new Date(),
                }}
                onDismiss={onDismiss}
                startDate={values.opensAt}
                endDate={values.closesAt}
                onConfirm={onConfirm}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};
