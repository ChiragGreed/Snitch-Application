
import { useEffect, useRef } from 'react';
import * as Updates from 'expo-updates';

export default function UpdateManager() {
  const { isUpdatePending } = Updates.useUpdates();
  const reloadStarted = useRef(false);

  useEffect(() => {
    if (
      __DEV__ ||
      !Updates.isEnabled ||
      !isUpdatePending ||
      reloadStarted.current
    ) {
      return;
    }

    reloadStarted.current = true;

    Updates.reloadAsync().catch((error) => {
      reloadStarted.current = false;
      console.error('Failed to apply OTA update:', error);
    });
  }, [isUpdatePending]);

  return null;
}
