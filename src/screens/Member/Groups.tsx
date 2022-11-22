import { FlatList, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Group, GroupProps } from "../../components/Group";
import { useDrawer } from "../../contexts/drawer";
import api from "../../services/api";

export const Groups = () => {
  const { organizationId } = useDrawer();
  const [groups, setQueues] = useState<GroupProps[]>();

  useEffect(() => {
    const fetchQueues = () => {
      api
        .get(`v1/groups/organizations/${organizationId}`)
        .then(({ data }) => {
          console.log(data);
          setQueues(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (organizationId) {
      fetchQueues();
    }
  }, [organizationId]);

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Group item={item} />;
        }}
      />
    </VStack>
  );
};
