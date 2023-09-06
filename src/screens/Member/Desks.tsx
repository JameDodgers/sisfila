import { FlatList, View } from "react-native";
import { useOrganizerStore } from "../../store/organizer";
import { useNavigation } from "@react-navigation/native";
import { OrganizationDrawerScreenProps } from "../../../@types/navigation";
import { useDesksQueries } from "../../queries/desks";
import { DeskItem } from "../../components/DeskItem";

export const Desks = () => {
  const navigation =
    useNavigation<OrganizationDrawerScreenProps<"Desks">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetDesks } = useDesksQueries();

  const { data: desks = [] } = useGetDesks(currentOrganizationId);

  return (
    <View className="flex-1">
      <FlatList
        data={desks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <DeskItem item={item} />}
      />
    </View>
  );
};
