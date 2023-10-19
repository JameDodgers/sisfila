import { View } from "react-native";
import { useOrganizerStore } from "../../store/organizer";
import { useNavigation } from "@react-navigation/native";
import { DesksStackScreenProps } from "../../../@types/navigation";
import { useDesksQueries } from "../../queries/desks";
import { DeskItem } from "../../components/DeskItem";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { useUser } from "../../store/auth";
import { StyledFlatList } from "../../libs/styled";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { ActivityIndicator, Appbar } from "react-native-paper";

export const Desks = () => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desks">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const user = useUser();

  const { useGetDesks, useDeleteDesk, useUpdateDesk } = useDesksQueries(
    currentOrganizationId
  );

  const { mutate: deleteDesk } = useDeleteDesk();

  const { mutate: updateDesk } = useUpdateDesk();

  const { data: desks, isLoading: isLoadingDesks } = useGetDesks();

  const [userOccupiesSomeDesk, setUserOccupiesSomeDesk] = useState(false);

  useEffect(() => {
    if (user && desks && desks.length > 0) {
      setUserOccupiesSomeDesk(
        desks.some((desk) => desk.attendantId === user?.id)
      );
    }
  }, [user, desks]);

  const handleEditDesk = (deskId: string) => {
    navigation.navigate("CreateOrUpdateDesk", {
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
                navigation.navigate("CreateOrUpdateDesk");
              }}
            />
          }
          {...props}
        />
      ),
    });
  }, [navigation]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingDesks) {
      return (
        <View className="items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  }, [isLoadingDesks]);

  return (
    <View className="flex-1">
      <StyledFlatList
        data={desks}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
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
