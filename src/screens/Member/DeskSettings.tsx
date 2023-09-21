import { useOrganizerStore } from "../../store/organizer";
import { DesksStackScreenProps } from "../../../@types/navigation";

import { Button } from "react-native-paper";
import { View } from "react-native";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDesksQueries } from "../../queries/desks";
import { useServicesQueries } from "../../queries/services";

import * as Yup from "yup";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { CheckboxList } from "../../components/CheckboxList";

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

  const { useGetServices } = useServicesQueries(currentOrganizationId);

  const { data: services = [] } = useGetServices();

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
              <CheckboxList
                title="Serviços"
                items={services}
                value={selectedServiceIds}
                setValue={setSelectedServiceIds}
              />
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
