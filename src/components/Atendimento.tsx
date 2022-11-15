import { Text, VStack, IPressableProps, Pressable } from "native-base";

export type AtendimentoProps = {
  id: Number;
  name: String;
};

type Props = IPressableProps & {
  item: AtendimentoProps;
};

const Atendimento = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};

export default Atendimento;
