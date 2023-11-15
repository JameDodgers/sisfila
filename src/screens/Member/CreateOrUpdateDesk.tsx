
import { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { Formik } from "formik";
import { Button } from "react-native-paper";
import * as Yup from "yup";

import { DesksStackScreenProps } from "../../../@types/navigation";
import { CheckboxList } from "../../components/CheckboxList";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { ScrollView } from "../../libs/styled";
import { useDesksQueries } from "../../queries/desks";
import { useServicesQueries } from "../../queries/services";
import { useOrganizerStore } from "../../store/organizer";

interface FormValues {
  name: string;
}

type Props = DesksStackScreenProps<"CreateOrUpdateDesk">;

export const CreateOrUpdateDesk = ({ route, navigation }: Props) => {
  const deskId = route.params?.deskId;

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetServices } = useServicesQueries(currentOrganizationId);

  const { data: services = [] } = useGetServices();

  const { useGetDesk, useCreateDesk, useUpdateDesk } = useDesksQueries(
    currentOrganizationId
  );

  const { data: desk } = useGetDesk(deskId);

  const { mutate: createDesk, isLoading: isCreatingDesk } = useCreateDesk();

  const { mutate: updateDesk, isLoading: isUpdatingDesk } = useUpdateDesk();

  const isLoading = isCreatingDesk || isUpdatingDesk;

  const onSuccess = () => navigation.goBack();

  const handleSubmit = ({ name }: FormValues) => {
    const payload = {
      name,
    };

    if (deskId) {
      const data = {
        ...payload,
        services: selectedServiceIds,
      };

      const params = {
        deskId,
        data,
      };

      updateDesk(params, { onSuccess });
    } else {
      const createPayload = {
        ...payload,
        organizationId: currentOrganizationId,
        servicesIds: selectedServiceIds,
      };

      createDesk(createPayload, { onSuccess });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  const actionButtonLabel = deskId ? "Salvar" : "Criar";

  useEffect(() => {
    if (desk?.services && desk.services.length > 0) {
      setSelectedServiceIds(desk.services.map((service) => service.id));
    }
  }, [desk?.services]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: desk?.name,
    });
  }, [navigation, desk]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <Formik
          initialValues={{
            name: desk?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 justify-between">
                <ScrollView contentContainerStyle="p-4 web:w-full web:self-center web:max-w-md">
                  <FormikTextInput
                    autoFocus={!deskId}
                    fieldName="name"
                    label="Nome*"
                  />
                  <CheckboxList
                    title="Serviços"
                    items={services}
                    value={selectedServiceIds}
                    setValue={setSelectedServiceIds}
                  />
                </ScrollView>
                <View className="p-4 border-t-gray-400 border-t">
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
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
