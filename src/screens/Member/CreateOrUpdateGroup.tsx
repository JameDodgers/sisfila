import { useLayoutEffect } from "react";
import { View } from "react-native";

import { Formik } from "formik";
import { Button } from "react-native-paper";
import * as Yup from "yup";

import { GroupsStackScreenProps } from "../../../@types/navigation";
import { FormikTextInput } from "../../components/FormikTextInput";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";


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

      updateGroup(updatePayload, {
        onSuccess: () => navigation.goBack(),
      });
    } else {
      createGroup(payload, {
        onSuccess: (group) => {
          navigation.replace("Group", {
            groupId: group.id,
          });
        },
      });
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
      <View className="flex-1 p-4 web:w-full web:self-center web:max-w-sm">
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
                    autoFocus={!groupId}
                    fieldName="name"
                    label="Nome*"
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
