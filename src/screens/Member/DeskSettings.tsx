import { useOrganizerStore } from "../../store/organizer";
import { DesksStackScreenProps } from "../../../@types/navigation";

import { Button, Checkbox, List } from "react-native-paper";
import { View } from "react-native";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDesksQueries } from "../../queries/desks";
import { useServicesQueries } from "../../queries/services";

import * as Yup from "yup";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";

type Props = {
  route: DesksStackScreenProps<"DeskSettings">["route"];
};

type FormValues = {
  name: string;
};

export const DeskSettings = ({ route }: Props) => {
  const navigation =
    useNavigation<DesksStackScreenProps<"DeskSettings">["navigation"]>();

  const deskId = route.params?.deskId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  const { useGetDesks, useUpdateDesk } = useDesksQueries();

  const { mutate: updateDesk, isLoading: isUpdatingDesk } = useUpdateDesk(
    currentOrganizationId
  );

  const { data: desk } = useGetDesks(currentOrganizationId, {
    select: (data) => data.find((item) => item.id === deskId),
  });

  const handleUpdateDesk = ({ name }: FormValues) => {
    const data = {
      name,
      services: selectedServiceIds,
    };

    const params = {
      deskId,
      data,
    };

    updateDesk(params, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  useEffect(() => {
    if (desk?.services && desk.services.length > 0) {
      setSelectedServiceIds(desk.services.map((service) => service.id));
    }
  }, [desk?.services]);

  const toggleServiceId = (id: string) =>
    setSelectedServiceIds((selectedServiceIds) =>
      selectedServiceIds.includes(id)
        ? selectedServiceIds.filter((serviceId) => serviceId !== id)
        : [...selectedServiceIds, id]
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: desk?.name,
    });
  }, [navigation, desk]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome não pode estar vazio"),
  });

  return (
    <SafeAreaInsetsContainer>
      <Formik
        initialValues={{
          name: desk?.name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateDesk}
      >
        {({ handleSubmit }) => (
          <View className="flex-1 p-4 gap-4 justify-between">
            <View>
              <FormikTextInput mode="outlined" fieldName="name" label="Nome" />
              <List.AccordionGroup>
                <List.Accordion title="Serviços" id="services">
                  {services.map((service) => (
                    <Checkbox.Item
                      mode="android"
                      key={service.id}
                      label={service.name}
                      status={
                        selectedServiceIds.includes(service.id)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => toggleServiceId(service.id)}
                    />
                  ))}
                </List.Accordion>
              </List.AccordionGroup>
            </View>
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              disabled={isUpdatingDesk}
            >
              Salvar
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaInsetsContainer>
  );
};