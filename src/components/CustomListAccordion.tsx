import { ReactNode, useState } from "react";
import { List, ListAccordionProps, ListItemProps } from "react-native-paper";

type Props = (ListItemProps & { children: ReactNode }) | ListAccordionProps;

export const CustomListAccordion = ({ children, ...props }: Props) => {
  const [expanded, setExpanded] = useState(true);

  const onPress = () => setExpanded((expanded) => !expanded);

  if (Array.isArray(children) && children.length === 0) {
    return <List.Item {...(props as ListItemProps)} />;
  }

  return (
    <List.Accordion
      expanded={expanded}
      onPress={onPress}
      {...(props as ListAccordionProps)}
    >
      {children}
    </List.Accordion>
  );
};
