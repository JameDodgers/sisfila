import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { useDesksQueries } from "../../queries/desks";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

interface FormValues {
  name: string;
}

export const CreateDesk = () => {
  const { currentOrganizationId = "" } = useOrganizerStore();

  const navigation = useNavigation();

  const { useCreateDesk } = useDesksQueries();

  const { mutate: createDesk, isLoading } = useCreateDesk(
    currentOrganizationId
  );

  const handleCreateDesk = ({ name }: FormValues) => {
    const payload = {
      name,
      organizationId: currentOrganizationId,
    };

    createDesk(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1 p-4 web:items-center">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateDesk}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
                <View>
                  <FormikTextInput autoFocus fieldName="name" label="Nome" />
                </View>
                <Button
                  className="web:self-end"
                  disabled={isLoading}
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  Criar guichê
                </Button>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
