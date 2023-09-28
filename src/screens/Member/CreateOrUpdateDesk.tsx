import { useOrganizerStore } from "../../store/organizer";

import { useDesksQueries } from "../../queries/desks";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { DesksStackScreenProps } from "../../../@types/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useServicesQueries } from "../../queries/services";
import { CheckboxList } from "../../components/CheckboxList";

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

  const { useGetDesks, useCreateDesk, useUpdateDesk } = useDesksQueries(
    currentOrganizationId
  );

  const { data: desk } = useGetDesks({
    enabled: !!deskId,
    select: (data) => data.find((item) => item.id === deskId),
  });

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
      <View className="flex-1 p-4 web:items-center">
        <Formik
          initialValues={{
            name: desk?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
                <View>
                  <FormikTextInput
                    autoFocus={!deskId}
                    fieldName="name"
                    label="Nome"
                  />
                  <CheckboxList
                    title="Serviços"
                    items={services}
                    value={selectedServiceIds}
                    setValue={setSelectedServiceIds}
                  />
                </View>
                <Button
                  className="web:self-end"
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
  );
};
