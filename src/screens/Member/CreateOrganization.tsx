import { useNavigation } from "@react-navigation/native";

import { useOrganizationsQueries } from "../../queries/organizations";
import { Button } from "react-native-paper";
import { View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

interface FormValues {
  name: string;
  code: string;
}

export const CreateOrganization = () => {
  const navigation = useNavigation();

  const { useCreateOrganization } = useOrganizationsQueries();

  const { mutate: createOrganization } = useCreateOrganization();

  const handleCreateOrganization = (values: FormValues) => {
    createOrganization(values, {
      onSuccess: () => {
        navigation.navigate("Organizations");
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    code: Yup.string()
      .min(2, "Mínimo de 2 caracteres")
      .max(10, "Máximo de 10 caracteres")
      .required("Código é um campo obrigatório"),
  });

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1 p-4 web:w-full web:self-center web:max-w-sm">
        <Formik
          initialValues={{
            name: "",
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateOrganization}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 justify-between web:justify-start">
                <View>
                  <FormikTextInput autoFocus fieldName="name" label="Nome" />
                  <FormikTextInput fieldName="code" label="Código" />
                </View>
                <Button
                  className="web:self-end"
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
    </SafeAreaInsetsContainer>
  );
};
