import { Menu, Text, ChevronDownIcon, HStack, Pressable } from "native-base";
import { useOrganizationsQueries } from "../queries/organizations";

import {
  setCurrentOrganizationId,
  useOrganizerStore,
} from "../store/organizer";

export const OrganizationSelector = () => {
  const { useGetOrganizations, useGetOrganization } = useOrganizationsQueries();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { data: organizations = [] } = useGetOrganizations();

  const { data: organization } = useGetOrganization(currentOrganizationId);

  const onChange = (value: string) => {
    setCurrentOrganizationId(value);
  };

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable alignSelf="flex-star" {...triggerProps}>
            <HStack space={2} p={3} alignItems="center">
              <Text suppressHighlighting={true}>{organization?.name}</Text>
              <ChevronDownIcon size={3} />
            </HStack>
          </Pressable>
        );
      }}
    >
      <Menu.OptionGroup
        type="radio"
        defaultValue={currentOrganizationId}
        title="Organização"
        onChange={onChange}
      >
        {organizations.map(({ id, name }) => (
          <Menu.ItemOption key={id} value={id}>
            {name}
          </Menu.ItemOption>
        ))}
      </Menu.OptionGroup>
    </Menu>
  );
};
