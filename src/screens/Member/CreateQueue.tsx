import { useCallback, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, HelperText } from "react-native-paper";
import { Picker } from "../../components/Picker";
import { ScrollView } from "../../libs/styled";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useQueuesQueries } from "../../queries/queues";
import { useGroupsQueries } from "../../queries/groups";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { CheckboxList } from "../../components/CheckboxList";
import { CustomTextInput } from "../../components/CustomTextInput";
import { RadioButtonList } from "../../components/RadioButtonList";

interface FormValues {
  name: string;
  priority: string;
  serviceId: string;
  code: string;
}

export const CreateQueue = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue } = useQueuesQueries();

  const { useGetGroups } = useGroupsQueries(currentOrganizationId);

  const { data: groups = [] } = useGetGroups();

  const { useGetServices } = useServicesQueries(currentOrganizationId);

  const { data: services = [] } = useGetServices();

  const { mutate: createQueue, isLoading } = useCreateQueue();

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (groups[0]) {
      setSelectedGroupIds([groups[0].id]);
    }
  }, [groups]);

  const [description, setDescription] = useState("");

  const [openPriorityPicker, setOpenPriorityPicker] = useState(false);

  const [priorityPickerItems, setPriorityPickerItems] = useState(
    _.range(1, 11).map((priority) => ({
      value: priority.toString(),
      label: priority.toString(),
    }))
  );

  const radioButtonsListItems = services.map((service) => ({
    key: service.id,
    label: service.name,
  }));

  const handleCreateQueue = ({
    name,
    code,
    priority,
    serviceId,
  }: FormValues) => {
    if (!priority || !serviceId) return;

    const payload = {
      name,
      description,
      code,
      priority: Number(priority),
      serviceId,
      organizationId: currentOrganizationId,
      groupIds: selectedGroupIds,
    };

    createQueue(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
    priority: Yup.string().required(),
    serviceId: Yup.string().required("Escolha um serviço"),
    code: Yup.string()
      .min(2, "Mínimo de 2 caracteres")
      .required("Código é um campo obrigatório"),
  });

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <Formik
          initialValues={{
            name: "",
            priority: "",
            serviceId: "",
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateQueue}
        >
          {({ values, errors, touched, setFieldValue, handleSubmit }) => {
            const setPriorityPickerValue = useCallback((state: any) => {
              let newState = state;

              if (typeof state === "function") {
                newState = state(values.priority);
              }

              setFieldValue("priority", newState);
            }, []);

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
                  <Picker
                    placeholder="Selecione uma prioridade*"
                    open={openPriorityPicker}
                    value={values.priority}
                    items={priorityPickerItems}
                    setOpen={setOpenPriorityPicker}
                    // https://github.com/hossein-zare/react-native-dropdown-picker/issues/255
                    setValue={setPriorityPickerValue}
                    setItems={setPriorityPickerItems}
                    zIndex={2}
                    error={!!(touched.priority && errors.priority)}
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
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Criar
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
