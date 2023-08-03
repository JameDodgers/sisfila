import { CheckIcon, Select, VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { useDrawer } from "../../contexts/drawer";

import { useServicesQueries } from "../../queries/services";
import _ from "lodash";
import { useOrganizationsQueries } from "../../queries/organizations";

export const CreateQueue = () => {
  const navigation = useNavigation();

  const { organizationId } = useDrawer();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [priority, setPriority] = useState("");

  const { useCreateQueue } = useOrganizationsQueries();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(organizationId);

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
      organizationId,
    };

    createQueue(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1} space={3}>
        <Input
          size="2xl"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <Input
          size="2xl"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          size="2xl"
          placeholder="Código"
          value={code}
          onChangeText={setCode}
        />

        <Select
          size="2xl"
          selectedValue={priority}
          accessibilityLabel="Escolha uma prioridade"
          placeholder="Prioridade"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(id) => setPriority(id)}
        >
          {_.range(1, 11).map((priority) => (
            <Select.Item
              key={priority}
              label={priority.toString()}
              value={priority.toString()}
            />
          ))}
        </Select>
        <Select
          size="2xl"
          selectedValue={selectedServiceId}
          accessibilityLabel="Escolha um serviço"
          placeholder="Escolha um serviço"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(id) => setSelectedServiceId(id)}
        >
          {services.map((service) => (
            <Select.Item
              key={service.id}
              label={service.name}
              value={service.id}
            />
          ))}
        </Select>
      </VStack>
      <Button onPress={handleCreateQueue}>Criar</Button>
    </VStack>
  );
};
