import { useState } from "react";

export const useRefreshByUser = (
  refresh: () => Promise<unknown>,
  enabled = true
) => {
  const [isRefetchingByUser, setRefetchingByUser] = useState(false);

  const refetchByUser = async () => {
    if (enabled) {
      setRefetchingByUser(true);
      try {
        await refresh();
      } finally {
        setRefetchingByUser(false);
      }
    }
  };

  return { isRefetchingByUser, refetchByUser };
};
