import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { useGroupsQueries } from "../../queries/groups";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";

interface FormValues {
  name: string;
}

export const CreateGroup = () => {
  const { currentOrganizationId = "" } = useOrganizerStore();

  const navigation = useNavigation();

  const { useCreateGroup } = useGroupsQueries();

  const { mutate: createGroup } = useCreateGroup();

  const handleCreateGroup = ({ name }: FormValues) => {
    const payload = {
      name,
      organizationId: currentOrganizationId,
    };
    createGroup(payload, {
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
    <View className="flex-1 p-4">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateGroup}
      >
        {({ handleSubmit }) => {
          return (
            <View className="flex-1 justify-between">
              <View>
                <FormikTextInput
                  fieldName="name"
                  mode="outlined"
                  label="Nome"
                />
              </View>
              <Button mode="contained" onPress={() => handleSubmit()}>
                Criar grupo
              </Button>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
