import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";

interface FormValues {
  data: string;
}
// https://stackoverflow.com/questions/74185149/regex-for-multiline-text-area
const dataStringPattern = /^(?:\d+(?:\t|,|;).+(?:\r?\n|$))+$/;
const dataLinePattern = /(\d+)(?:\t|,|;)(.+)/g;

export const ImportClients = ({
  route,
  navigation,
}: GroupsStackScreenProps<"ImportClients">) => {
  const { groupId } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useImportClients } = useGroupsQueries();

  const { mutate: importClients } = useImportClients();

  const handleImportClients = ({ data }: FormValues) => {
    const matches = data.matchAll(dataLinePattern);

    let clients = [];

    for (const match of matches) {
      clients.push({
        name: match[2],
        registrationId: match[1],
        organizationId: currentOrganizationId,
      });
    }

    const payload = {
      clients,
      organizationId: currentOrganizationId,
      groupId,
    };

    importClients(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    data: Yup.string()
      .matches(dataStringPattern, "Dados não estão no formato correto")
      .required("Insira os dados"),
  });

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1 p-4 web:items-center">
        <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
          <Formik
            initialValues={{
              data: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleImportClients}
          >
            {({ handleSubmit }) => {
              return (
                <View className="flex-1 android:justify-between ios:justify-between">
                  <FormikTextInput
                    fieldName="data"
                    className="mt-7"
                    label="Dados"
                    mode="outlined"
                    multiline
                    numberOfLines={5}
                  />
                  <Button
                    className="mt-4 web:self-end"
                    mode="contained"
                    onPress={() => handleSubmit()}
                  >
                    Importar
                  </Button>
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </SafeAreaInsetsContainer>
  );
};
