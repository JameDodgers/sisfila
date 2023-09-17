import { Dispatch, useState } from "react";
import { Checkbox, List, ListAccordionProps } from "react-native-paper";

type Item = {
  id: string;
  name: string;
};

type Props = {
  items: Item[];
  selectedIds: string[];
  setSelectedIds: Dispatch<React.SetStateAction<string[]>>;
} & Pick<ListAccordionProps, "title">;

export const CheckboxList = ({
  items,
  selectedIds,
  setSelectedIds,
  ...props
}: Props) => {
  const [expanded, setExpanded] = useState(true);

  const toggleItemId = (id: string) =>
    setSelectedIds((selectedIds) =>
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id]
    );

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion expanded={expanded} onPress={handlePress} {...props}>
      {items.map((item) => (
        <Checkbox.Item
          mode="android"
          key={item.id}
          label={item.name}
          status={selectedIds.includes(item.id) ? "checked" : "unchecked"}
          onPress={() => toggleItemId(item.id)}
        />
      ))}
    </List.Accordion>
  );
};
