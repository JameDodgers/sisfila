import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";

import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "../../components/Picker";
import { ScrollView } from "../../libs/styled";
import { Formik } from "formik";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useOrganizationQueuesQueries } from "../../queries/organizationQueues";

interface FormValues {
  name: string;
  priority: string;
  code: string;
}

export const CreateQueue = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue } = useOrganizationQueuesQueries();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const { mutate: createQueue, isLoading } = useCreateQueue();

  const [description, setDescription] = useState("");

  const [openPriorityPicker, setOpenPriorityPicker] = useState(false);

  const [priorityPickerItems, setPriorityPickerItems] = useState(
    _.range(1, 11).map((priority) => ({
      value: priority.toString(),
      label: priority.toString(),
    }))
  );

  const onOpenPriorityPicker = () => {
    setOpenPriorityPicker(true);
  };

  const [openServicePicker, setOpenServicePicker] = useState(false);
  const [servicePickerItems, setServicePickerItems] = useState(
    services.map((service) => ({ value: service.id, label: service.name }))
  );

  const onOpenServicePicker = () => {
    setOpenPriorityPicker(false);
  };

  const handleCreateQueue = ({ name, code, priority }: FormValues) => {
    if (!priority) return;

    const payload = {
      name,
      description,
      code,
      priority: Number(priority),
      serviceId: selectedServiceId,
      organizationId: currentOrganizationId,
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
    code: Yup.string()
      .min(2, "Mínimo de 2 caracteres")
      .required("Código é um campo obrigatório"),
  });

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          name: "",
          priority: "",
          code: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateQueue}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
        }) => {
          const onClosePriorityPicker = () => {
            setFieldTouched("priority", true);
          };

          return (
            <View className="flex-1">
              <ScrollView contentContainerStyle="web:self-center web:sm:w-96  p-4 ios:justify-between android:justify-between">
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
                    error={!!(touched.priority && errors.priority)}
                    open={openPriorityPicker}
                    onOpen={onOpenPriorityPicker}
                    onClose={onClosePriorityPicker}
                    value={values.priority}
                    items={priorityPickerItems}
                    setOpen={setOpenPriorityPicker}
                    //https://github.com/hossein-zare/react-native-dropdown-picker/issues/255
                    setValue={(state) => {
                      let newState = state;

                      if (typeof state === "function") {
                        newState = state(values.priority);
                      }

                      setFieldValue("priority", newState);
                    }}
                    setItems={setPriorityPickerItems}
                    zIndex={2}
                  />
                  <View className="mt-7" />
                  <Picker
                    placeholder="Selecione um serviço"
                    open={openServicePicker}
                    onOpen={onOpenServicePicker}
                    value={selectedServiceId}
                    items={servicePickerItems}
                    setOpen={setOpenServicePicker}
                    setValue={setSelectedServiceId}
                    setItems={setServicePickerItems}
                    zIndex={1}
                  />
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
  );
};
