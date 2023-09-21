import { Dispatch, useState } from "react";
import { Checkbox, List, ListAccordionProps } from "react-native-paper";

type Item = {
  id: string;
  name: string;
};

type Props = {
  value: string[];
  setValue: Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
} & Pick<ListAccordionProps, "title">;

export const CheckboxList = ({ items, value, setValue, ...props }: Props) => {
  const [expanded, setExpanded] = useState(true);

  const onCheckItem = (id: string) =>
    setValue((value) =>
      value.includes(id) ? value.filter((i) => i !== id) : [...value, id]
    );

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion expanded={expanded} onPress={handlePress} {...props}>
      {items.map((item) => {
        const status = value.includes(item.id) ? "checked" : "unchecked";

        return (
          <Checkbox.Item
            mode="android"
            key={item.id}
            label={item.name}
            status={status}
            onPress={() => onCheckItem(item.id)}
          />
        );
      })}
    </List.Accordion>
  );
};
