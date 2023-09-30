import { useEffect, useLayoutEffect, useState } from "react";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, HelperText } from "react-native-paper";
import { ScrollView } from "../../libs/styled";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useQueuesQueries } from "../../queries/queues";
import { useGroupsQueries } from "../../queries/groups";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { CheckboxList } from "../../components/CheckboxList";
import { CustomTextInput } from "../../components/CustomTextInput";
import { RadioButtonList } from "../../components/RadioButtonList";
import { QueuesStackScreenProps } from "../../../@types/navigation";

interface FormValues {
  name: string;
  serviceId: string;
  code: string;
}

type Props = QueuesStackScreenProps<"CreateOrUpdateQueue">;

export const CreateOrUpdateQueue = ({ route, navigation }: Props) => {
  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue, useGetQueue, useUpdateQueue } = useQueuesQueries(
    currentOrganizationId
  );
  const { data: queue } = useGetQueue(queueId);

  const { useGetGroups } = useGroupsQueries(currentOrganizationId);

  const { data: groups = [] } = useGetGroups();

  const { useGetServices } = useServicesQueries(currentOrganizationId);

  const { data: services = [] } = useGetServices();

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

  const radioButtonsListItems = services.map((service) => ({
    key: service.id,
    label: service.name,
  }));

  const onSuccess = () => navigation.goBack();

  const handleSubmit = ({ name, code, serviceId }: FormValues) => {
    if (!serviceId) return;

    const basePayload = {
      name,
      description,
      code,
      serviceId,
      organizationId: currentOrganizationId,
    };

    if (queueId) {
      const updatePayload = {
        ...basePayload,
        queueId,
        groups: selectedGroupIds,
      };

      updateQueue(updatePayload, { onSuccess });
    } else {
      const createPayload = {
        ...basePayload,
        groupIds: selectedGroupIds,
      };

      createQueue(createPayload, { onSuccess });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    serviceId: Yup.string().required("Escolha um serviço"),
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
            serviceId: queue?.serviceId || "",
            code: queue?.code || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleSubmit }) => {
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
                  <View className="mt-7" />
                  <RadioButtonList
                    title="Serviços"
                    items={radioButtonsListItems}
                    value={values.serviceId}
                    setValue={(value) => setFieldValue("serviceId", value)}
                  />
                  <HelperText type="error">
                    {!!(touched.serviceId && errors.serviceId)
                      ? errors.serviceId
                      : " "}
                  </HelperText>
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
