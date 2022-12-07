import { VStack, Text, Button, Input } from "native-base";
import { useState } from "react";

import { useDrawer } from "../../contexts/drawer";

import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export const ImportClients = () => {
  const navigation = useNavigation();

  const { organizationId } = useDrawer();

  const [data, setData] = useState("");

  const handleImportClients = () => {
    const line = data.split("\n");
    let clients = [];

    for (let i = 0; i < line.length; i++) {
      clients.push(line[i].split("\t"));
    }

    Promise.all(
      clients.map((client) =>
        api.post("v1/clients", {
          name: client[1],
          registrationId: client[0],
          organizationId,
        })
      )
    )
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <VStack flex={1} p={3} alignItems="center">
      <VStack
        _web={{
          w: "50%",
        }}
        w="100%"
        space={4}
      >
        <Input
          multiline
          numberOfLines={5}
          value={data}
          onChangeText={setData}
        />
        <Button onPress={handleImportClients}>
          <Text>Importar</Text>
        </Button>
      </VStack>
    </VStack>
  );
};
