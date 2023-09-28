import { useState } from "react";
import { List, ListAccordionProps } from "react-native-paper";

type Props = ListAccordionProps;

export const CustomListAccordion = ({ children, ...props }: Props) => {
  const [expanded, setExpanded] = useState(true);

  const onPress = () => setExpanded((expanded) => !expanded);

  return (
    <List.Accordion expanded={expanded} onPress={onPress} {...props}>
      {children}
    </List.Accordion>
  );
};
