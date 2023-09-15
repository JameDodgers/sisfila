import { useCallback, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, Checkbox, List, TextInput } from "react-native-paper";
import { Picker } from "../../components/Picker";
import { ScrollView } from "../../libs/styled";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useOrganizationQueuesQueries } from "../../queries/organizationQueues";
import { useGroupsQueries } from "../../queries/groups";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

interface FormValues {
  name: string;
  priority: string;
  serviceId: string;
  code: string;
}

export const CreateQueue = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue } = useOrganizationQueuesQueries();

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(currentOrganizationId);

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  const { mutate: createQueue, isLoading } = useCreateQueue();

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (groups[0]) {
      setSelectedGroupIds([groups[0].id]);
    }
  }, [groups]);

  const toggleGroupId = (id: string) =>
    setSelectedGroupIds((selectedGroupIds) =>
      selectedGroupIds.includes(id)
        ? selectedGroupIds.filter((i) => i !== id)
        : [...selectedGroupIds, id]
    );

  const [description, setDescription] = useState("");

  const [openPriorityPicker, setOpenPriorityPicker] = useState(false);

  const [priorityPickerItems, setPriorityPickerItems] = useState(
    _.range(1, 11).map((priority) => ({
      value: priority.toString(),
      label: priority.toString(),
    }))
  );

  const onOpenPriorityPicker = () => {
    setOpenServicePicker(false);
  };

  const [openServicePicker, setOpenServicePicker] = useState(false);
  const [servicePickerItems, setServicePickerItems] = useState(
    services.map((service) => ({ value: service.id, label: service.name }))
  );

  const onOpenServicePicker = () => {
    setOpenPriorityPicker(false);
  };

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
    serviceId: Yup.string().required(),
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

            const setServiceIdPickerValue = useCallback((state: any) => {
              let newState = state;

              if (typeof state === "function") {
                newState = state(values.serviceId);
              }

              setFieldValue("serviceId", newState);
            }, []);

            return (
              <View className="flex-1">
                <ScrollView contentContainerStyle="flex-1 web:self-center web:sm:w-96  p-4 ios:justify-between android:justify-between">
                  <View>
                    <FormikTextInput
                      fieldName="name"
                      mode="outlined"
                      label="Nome"
                    />
                    <TextInput
                      mode="outlined"
                      label="Descrição"
                      value={description}
                      onChangeText={setDescription}
                    />
                    <FormikTextInput
                      className="mt-6"
                      fieldName="code"
                      mode="outlined"
                      label="Código"
                    />
                    <Picker
                      placeholder="Selecione uma prioridade*"
                      open={openPriorityPicker}
                      onOpen={onOpenPriorityPicker}
                      value={values.priority}
                      items={priorityPickerItems}
                      setOpen={setOpenPriorityPicker}
                      //https://github.com/hossein-zare/react-native-dropdown-picker/issues/255
                      setValue={setPriorityPickerValue}
                      setItems={setPriorityPickerItems}
                      zIndex={2}
                      error={!!(touched.priority && errors.priority)}
                    />
                    <View className="mt-7" />
                    <Picker
                      placeholder="Selecione um serviço*"
                      open={openServicePicker}
                      onOpen={onOpenServicePicker}
                      value={values.serviceId}
                      items={servicePickerItems}
                      setOpen={setOpenServicePicker}
                      //https://github.com/hossein-zare/react-native-dropdown-picker/issues/255
                      setValue={setServiceIdPickerValue}
                      setItems={setServicePickerItems}
                      zIndex={1}
                      error={!!(touched.serviceId && errors.serviceId)}
                    />
                    <View className="mt-7">
                      <List.AccordionGroup>
                        <List.Accordion title="Grupos" id="groups">
                          {groups.map((group) => (
                            <Checkbox.Item
                              mode="android"
                              key={group.id}
                              label={group.name}
                              status={
                                selectedGroupIds.includes(group.id)
                                  ? "checked"
                                  : "unchecked"
                              }
                              onPress={() => toggleGroupId(group.id)}
                            />
                          ))}
                        </List.Accordion>
                      </List.AccordionGroup>
                    </View>
                  </View>
                  <Button
                    className="mt-7 web:self-end"
                    mode="contained"
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Criar
                  </Button>
                </ScrollView>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaInsetsContainer>
  );
};
