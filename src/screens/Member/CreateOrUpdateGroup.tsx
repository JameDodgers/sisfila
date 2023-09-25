import { Button } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { useOrganizerStore } from "../../store/organizer";
import { useGroupsQueries } from "../../queries/groups";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useLayoutEffect } from "react";

interface FormValues {
  name: string;
}

type Props = GroupsStackScreenProps<"CreateOrUpdateGroup">;

export const CreateOrUpdateGroup = ({ navigation, route }: Props) => {
  const groupId = route.params?.groupId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroup, useCreateGroup, useUpdateGroup } = useGroupsQueries(
    currentOrganizationId
  );

  const { data: group } = useGetGroup(groupId);

  const { mutate: createGroup, isLoading: isCreatingGroup } = useCreateGroup();

  const { mutate: updateGroup, isLoading: isUpdatingGroup } = useUpdateGroup();

  const isLoading = isCreatingGroup || isUpdatingGroup;

  const onSuccess = () => navigation.goBack();

  const handleSubmit = ({ name }: FormValues) => {
    const payload = {
      name,
      organizationId: currentOrganizationId,
    };

    if (groupId) {
      const updatePayload = {
        ...payload,
        groupId,
      };

      updateGroup(updatePayload, { onSuccess });
    } else {
      createGroup(payload, { onSuccess });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  const actionButtonLabel = groupId ? "Salvar" : "Criar";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: group?.name,
    });
  }, [group?.name]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1  p-4 web:w-full web:self-center web:max-w-sm">
        <Formik
          initialValues={{
            name: group?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 justify-between web:justify-start">
                <View>
                  <FormikTextInput
                    fieldName="name"
                    mode="outlined"
                    label="Nome"
                  />
                </View>
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
            );
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
