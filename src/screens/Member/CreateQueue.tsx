import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";
import { useOrganizationsQueries } from "../../queries/organizations";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";

import { Button, TextInput } from "react-native-paper";
import { Picker } from "../../components/Picker";
import { ScrollView } from "../../libs/styled";

export const CreateQueue = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue } = useOrganizationsQueries();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const { mutate: createQueue } = useCreateQueue();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const [openPriorityPicker, setOpenPriorityPicker] = useState(false);
  const onOpenPriorityPicker = () => {
    setOpenServicePicker(false);
  };
  const [priorityPickerItems, setPriorityPickerItems] = useState(
    _.range(1, 11).map((priority) => ({
      value: priority.toString(),
      label: priority.toString(),
    }))
  );

  const [openServicePicker, setOpenServicePicker] = useState(false);
  const [servicePickerItems, setServicePickerItems] = useState(
    services.map((service) => ({ value: service.id, label: service.name }))
  );
  const onOpenServicePicker = () => {
    setOpenPriorityPicker(false);
  };

  const handleCreateQueue = () => {
    if (!name || !description || !code) {
      return;
    }

    const payload = {
      name,
      description,
      code,
      priority: Number(selectedPriority),
      serviceId: selectedServiceId,
      organizationId: currentOrganizationId,
    };

    createQueue(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View className="flex-1">
      <ScrollView className="p-4">
        <View className="g-2">
          <TextInput
            mode="outlined"
            label="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            mode="outlined"
            label="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            mode="outlined"
            label="Código"
            value={code}
            onChangeText={setCode}
          />
          <Picker
            placeholder="Selecione uma prioridade"
            open={openPriorityPicker}
            onOpen={onOpenPriorityPicker}
            value={selectedPriority}
            items={priorityPickerItems}
            setOpen={setOpenPriorityPicker}
            setValue={setSelectedPriority}
            setItems={setPriorityPickerItems}
            zIndex={2}
          />
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
      </ScrollView>
      <View className="p-4">
        <Button mode="contained" onPress={handleCreateQueue}>
          Criar
        </Button>
      </View>
    </View>
  );
};
