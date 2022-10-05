import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, VStack } from "native-base";
import { useState } from "react";
import Atendimento, { AtendimentoProps } from "../components/Atendimento";

const data = [
  { id: 1, nome: "Ciência da Computação" },
  { id: 2, nome: "Sistemas de Informação" },
  { id: 3, nome: "Bacharelado em Ciência da Computação" },
];

export const Atendimentos = () => {
  const navigation = useNavigation();

  const [atendimentos, setAtendimentos] = useState<AtendimentoProps[]>(data);

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={atendimentos}
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
