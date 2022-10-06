import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import Atendimento, { AtendimentoProps } from "../components/Atendimento";
import api from "../services/axios";


export const Atendimentos = () => {
  const navigation = useNavigation();

  const [atendimentos, setAtendimentos] =
    useState<AtendimentoProps[]>([]);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const { data } = await api.get("organizations");
        setAtendimentos(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAtendimentos();
  }, []);

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
