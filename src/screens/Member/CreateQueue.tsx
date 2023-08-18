import { useState } from "react";

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [priority, setPriority] = useState("");

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useCreateQueue } = useOrganizationsQueries();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const { mutate: createQueue } = useCreateQueue();

  const handleCreateQueue = () => {
    if (!name || !description || !code) {
      return;
    }

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
            label="Prioridade"
            mode="dropdown"
            selectedValue={priority}
            onValueChange={(value) => setPriority(value)}
          >
            {_.range(1, 11).map((priority) => (
              <Picker.Item
                key={priority}
                label={priority.toString()}
                value={priority.toString()}
              />
            ))}
          </Picker>
          <Picker
            label="Serviço"
            mode="dropdown"
            selectedValue={selectedServiceId}
            onValueChange={(id) => setSelectedServiceId(id)}
          >
            {services.map((service) => (
              <Picker.Item
                key={service.id}
                label={service.name}
                value={service.id}
              />
            ))}
          </Picker>
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
