import { useEffect, useLayoutEffect, useState } from "react";

import _ from "lodash";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import * as Yup from "yup";
import { Button } from "react-native-paper";
import { ScrollView } from "../../libs/styled";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useQueuesQueries } from "../../queries/queues";
import { useGroupsQueries } from "../../queries/groups";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { CheckboxList } from "../../components/CheckboxList";
import { CustomTextInput } from "../../components/CustomTextInput";
import { ServicesStackScreenProps } from "../../../@types/navigation";

interface FormValues {
  name: string;
  code: string;
}

type Props = ServicesStackScreenProps<"CreateOrUpdateQueue">;

export const CreateOrUpdateQueue = ({ route, navigation }: Props) => {
  const { queueId, serviceId } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue, useGetQueue, useUpdateQueue } = useQueuesQueries(
    currentOrganizationId
  );
  const { data: queue } = useGetQueue(queueId);

  const { useGetGroups } = useGroupsQueries(currentOrganizationId);

  const { data: groups = [] } = useGetGroups();

  const { mutate: createQueue, isLoading: isCreatingQueue } = useCreateQueue();

  const { mutate: updateQueue, isLoading: isUpdatingQueue } = useUpdateQueue();

  const isLoading = isCreatingQueue || isUpdatingQueue;

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (queue) {
      setSelectedGroupIds(queue.groups.map((group) => group.id));
    }
  }, [queue?.groups]);

  const [description, setDescription] = useState(queue?.description || "");

  const onSuccess = () => navigation.goBack();

  const handleSubmit = ({ name, code }: FormValues) => {
    const basePayload = {
      name,
      description,
      code,

      organizationId: currentOrganizationId,
    };

    if (queueId) {
      const updatePayload = {
        ...basePayload,
        queueId,
        groups: selectedGroupIds,
      };

      updateQueue(updatePayload, { onSuccess });
    } else if (serviceId) {
      const createPayload = {
        ...basePayload,
        groupIds: selectedGroupIds,
        serviceId,
      };

      createQueue(createPayload, { onSuccess });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    code: Yup.string()
      .min(2, "Mínimo de 2 caracteres")
      .required("Código é um campo obrigatório"),
  });

  const actionButtonLabel = queueId ? "Salvar" : "Criar";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: queue?.name,
    });
  }, [navigation, queue]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <Formik
          initialValues={{
            name: queue?.name || "",
            code: queue?.code || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <View className="flex-1 justify-between web:justify-start">
                <ScrollView
                  className="web:grow-0"
                  contentContainerStyle="p-4 web:w-full web:self-center web:max-w-sm"
                >
                  <FormikTextInput autoFocus fieldName="name" label="Nome" />
                  <CustomTextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                  />
                  <FormikTextInput
                    className="mt-6"
                    fieldName="code"
                    label="Código*"
                  />
                  <CheckboxList
                    title="Grupos"
                    items={groups}
                    value={selectedGroupIds}
                    setValue={setSelectedGroupIds}
                  />
                </ScrollView>
                <View className="p-4 web:w-full web:self-center web:max-w-sm">
                  <Button
                    className="web:self-end"
                    mode="contained"
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    {actionButtonLabel}
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
