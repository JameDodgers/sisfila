import { useNavigation } from "@react-navigation/native";
import { IconButton, Icon, Text, VStack } from "native-base";
import { useEffect, useLayoutEffect } from "react";

import Feather from "@expo/vector-icons/Feather";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { OrganizationSelector } from "../../components/OrganizationSelector";

export const Attendants = ({}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: HeaderButtonProps) => (
        <IconButton
          variant="link"
          icon={<Icon as={Feather} name="plus" color={tintColor} />}
          onPress={() => {}}
        />
      ),
      headerTitle: () => <OrganizationSelector />,
    });
  }, [navigation]);

  return (
    <VStack flex={1}>
      <Text>Alo</Text>
    </VStack>
  );
};
