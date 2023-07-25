import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useRefreshOnFocus = <T>(
  refetch: () => Promise<T>,
  enabled = true
) => {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      if (enabled) {
        refetch();
      }
    }, [enabled, refetch])
  );
};
