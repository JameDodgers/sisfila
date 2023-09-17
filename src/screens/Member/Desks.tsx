import { View } from "react-native";
import { useOrganizerStore } from "../../store/organizer";
import { useNavigation } from "@react-navigation/native";
import { DesksStackScreenProps } from "../../../@types/navigation";
import { useDesksQueries } from "../../queries/desks";
import { DeskItem } from "../../components/DeskItem";
import { useEffect, useLayoutEffect, useState } from "react";

import { useUser } from "../../store/auth";
import { CustomFlatList } from "../../libs/styled";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { Appbar } from "react-native-paper";

export const Desks = () => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desks">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const user = useUser();

  const { useGetDesks, useDeleteDesk, useUpdateDesk } = useDesksQueries();

  const { mutate: deleteDesk } = useDeleteDesk(currentOrganizationId);

  const { mutate: updateDesk } = useUpdateDesk(currentOrganizationId);

  const { data: desks = [] } = useGetDesks(currentOrganizationId, {
    select: (desks) =>
      [...desks].sort(
        (a, b) =>
          Number(b.attendantId === user?.id) -
          Number(a.attendantId === user?.id)
      ),
  });

  const [userOccupiesSomeDesk, setUserOccupiesSomeDesk] = useState(false);

  useEffect(() => {
    if (user && desks && desks.length > 0) {
      setUserOccupiesSomeDesk(
        desks.some((desk) => desk.attendantId === user?.id)
      );
    }
  }, [user, desks]);

  const handleEditDesk = (deskId: string) => {
    navigation.navigate("DeskSettings", {
      deskId,
    });
  };

  const handleDeleteDesk = (deskId: string) => {
    deleteDesk(deskId);
  };

  const handleUpdateDesk = (deskId: string, occupy: boolean) => {
    const data = {
      attendantId: occupy ? user?.id : null,
    };

    const params = {
      deskId,
      data,
    };

    updateDesk(params, {
      onSuccess: () => {
        if (occupy) {
          navigation.navigate("Desk", {
            deskId,
          });
        }
      },
    });
  };

  const handleOpenDesk = (deskId: string) => {
    navigation.navigate("Desk", {
      deskId,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          headerRight={
            <Appbar.Action
              icon="plus"
              onPress={() => {
                navigation.navigate("CreateDesk");
              }}
            />
          }
          {...props}
        />
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1">
      <CustomFlatList
        data={desks}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }: any) => (
          <DeskItem
            item={item}
            openDeskSettings={() => handleEditDesk(item.id)}
            openDesk={() => handleOpenDesk(item.id)}
            deleteDesk={() => handleDeleteDesk(item.id)}
            startService={() => handleUpdateDesk(item.id, true)}
            endService={() => handleUpdateDesk(item.id, false)}
            userOccupiesSomeDesk={userOccupiesSomeDesk}
            occupiedByUser={!!user && user.id === item.attendantId}
          />
        )}
      />
    </View>
  );
};
