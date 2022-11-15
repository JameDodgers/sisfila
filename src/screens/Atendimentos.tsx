import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import Atendimento, { AtendimentoProps } from "../components/Atendimento";
import api from "../services/api";

export const Atendimentos = () => {
  const navigation = useNavigation();

  const [atendimentos, setAtendimentos] = useState<AtendimentoProps[]>([]);

  useEffect(() => {
    api
      .get("v1/organizations")
      .then(({ data }) => {
        console.log(data);
        setAtendimentos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={atendimentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Atendimento
              item={item}
              onPress={() => {
                navigation.navigate("Organization", { id: item.id });
              }}
            />
          );
        }}
      />
    </VStack>
  );
};
