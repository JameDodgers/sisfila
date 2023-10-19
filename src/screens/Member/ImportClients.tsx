import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
  const theme = useTheme();
  const { groupId } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useImportClients } = useGroupsQueries(currentOrganizationId);

  const { mutate: importClients } = useImportClients();

  const handleImportClients = ({ data }: FormValues) => {
    const matches = data.matchAll(dataLinePattern);

    let clients = [];

    for (const match of matches) {
      clients.push({
        name: match[2].trim(),
        registrationId: match[1].trim(),
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
                  <View>
                    <View
                      className="rounded-lg p-2"
                      style={{ backgroundColor: theme.colors.surfaceVariant }}
                    >
                      <View className="flex-row items-center mb-2">
                        <Icon size={20} name="information-outline" />
                        <Text className="ml-2" variant="titleMedium">
                          Formato dos dados
                        </Text>
                      </View>
                      <Text variant="bodyMedium">
                        Cole aqui as matrículas e nomes dos alunos, separados
                        por vírgula, ponto e vírgula ou tabulação, um aluno por
                        linha. Exemplo:
                      </Text>
                      <Text variant="bodySmall">
                        1234 Fulano de Tal{"\n"}
                        4321 Sicrana de Tal
                      </Text>
                    </View>
                    <FormikTextInput
                      fieldName="data"
                      className="mt-2"
                      label="Dados"
                      multiline
                      numberOfLines={5}
                    />
                  </View>
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
