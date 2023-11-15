import { Dispatch, useState } from "react";

import { List, ListAccordionProps, RadioButton } from "react-native-paper";

type Item = {
  key: string;
  label: string;
};

type Props = {
  items: Item[];
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
} & Pick<ListAccordionProps, "title">;

export const RadioButtonList = ({
  items,
  value,
  setValue,
  ...props
}: Props) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion expanded={expanded} onPress={handlePress} {...props}>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        {items.map((item) => (
          <RadioButton.Item
            key={item.key}
            mode="android"
            value={item.key}
            label={item.label}
          />
        ))}
      </RadioButton.Group>
    </List.Accordion>
  );
};
