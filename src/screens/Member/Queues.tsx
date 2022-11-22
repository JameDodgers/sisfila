import { Text, VStack } from "native-base";

export const Queues = () => {
  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={queues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Queue item={item} />;
        }}
      />
    </VStack>
  );
};
