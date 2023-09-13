import { FlatList, View } from "react-native";
import { useOrganizerStore } from "../../store/organizer";
import { useNavigation } from "@react-navigation/native";
import { DesksStackScreenProps } from "../../../@types/navigation";
import { useDesksQueries } from "../../queries/desks";
import { DeskItem } from "../../components/DeskItem";
import { useCallback } from "react";
import { Button, Card } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../components/FormikTextInput";
import { useUser } from "../../store/auth";

type FormValues = {
  name: string;
};

export const Desks = () => {
  const navigation =
    useNavigation<DesksStackScreenProps<"Desks">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const user = useUser();

  const { useGetDesks, useCreateDesk, useDeleteDesk, useUpdateDesk } =
    useDesksQueries();

  const { mutate: createDesk, isLoading: isCreatingDesk } = useCreateDesk(
    currentOrganizationId
  );

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

  const handleOpenDesk = (deskId: string) => {
    navigation.navigate("DeskSettings", {
      deskId,
    });
  };

  const handleCreateDesk = useCallback(
    ({ name }: FormValues) => {
      createDesk({
        name,
        organizationId: currentOrganizationId,
      });
    },
    [currentOrganizationId]
  );

  const handleDeleteDesk = (deskId: string) => {
    deleteDesk(deskId);
  };

  const handleUpdateDesk = (deskId: string) => {
    const data = {
      attendantId: user?.id,
    };

    const params = {
      deskId,
      data,
    };

    updateDesk(params, {
      onSuccess: () => {
        navigation.navigate("Desk", {
          deskId,
        });
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Escolha um nome maior")
      .required("Nome é um campo obrigatório"),
  });

  const ListHeaderComponent = useCallback(
    () => (
      <View className="mb-4">
        <Card mode="elevated">
          <Card.Title title="Novo guichê" />
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreateDesk}
          >
            {({ handleSubmit }) => (
              <>
                <Card.Content>
                  <FormikTextInput
                    mode="outlined"
                    fieldName="name"
                    label="Nome"
                  />
                </Card.Content>
                <Card.Actions className="mr-2 mb-2">
                  <Button
                    mode="text"
                    disabled={isCreatingDesk}
                    onPress={() => handleSubmit()}
                  >
                    Criar
                  </Button>
                </Card.Actions>
              </>
            )}
          </Formik>
        </Card>
      </View>
    ),
    [isCreatingDesk, handleCreateDesk]
  );

  return (
    <View className="flex-1">
      <FlatList
        data={desks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item }) => (
          <DeskItem
            item={item}
            openDeskSettings={() => handleOpenDesk(item.id)}
            deleteDesk={() => handleDeleteDesk(item.id)}
            startService={() => handleUpdateDesk(item.id)}
          />
        )}
      />
    </View>
  );
};
