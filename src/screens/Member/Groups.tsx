import { useCallback, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { IconButton } from "react-native-paper";
import { Group, GroupProps } from "../../components/Group";
import { useDrawer } from "../../contexts/drawer";
import api from "../../services/api/config";

export const Groups = () => {
  const navigation = useNavigation();
  const { organizationId } = useDrawer();

  const [groups, setQueues] = useState<GroupProps[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const fetchQueues = () => {
        api
          .get(`v1/groups/organizations/${organizationId}`)
          .then(({ data }) => {
            setQueues(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      if (organizationId) {
        fetchQueues();
      }
    }, [organizationId])
  );

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
