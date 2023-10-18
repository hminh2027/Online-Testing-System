import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';

import { MODE } from '@/constants/status';

interface DrawerProps {
  isDrawerOpen: boolean;
  mode: MODE;
  toggleDrawer: (value: boolean) => void;
  setMode: (mode: MODE) => void;
  handleCancel: () => void;
  handleClose: () => void;
  handleToggleMode: (targetMode: MODE) => void;
  detailId: number;
  setDetailId: (id: number) => void;
  resetDrawerState: () => void;
}

const DrawerContext = createContext({});

export function DrawerContextProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<MODE | null>(null);
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const [detailId, setDetailId] = useState<number | null | string>(null);

  const navigation = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const resetDrawerState = useCallback(() => {
    toggleDrawer(false);
    setDetailId(null);
    setMode(null);
    navigation({
      pathname: '',
    });
  }, [navigation, toggleDrawer]);

  const handleClose = useCallback(() => resetDrawerState(), [resetDrawerState]);

  const handleToggleMode = useCallback(
    (targetMode: MODE) => {
      setMode(targetMode);
      toggleDrawer(true);
    },
    [toggleDrawer],
  );

  useEffect(() => {
    const pathArray = pathname?.split('/');
    const action = pathArray[pathArray.length - 1];

    if (action === 'create') {
      handleToggleMode(MODE.ADD);

      return;
    }

    if (id) {
      handleToggleMode(action === 'edit' ? MODE.EDIT : MODE.DETAIL);

      setDetailId(id);
    }
  }, [pathname, id, handleToggleMode, setDetailId]);

  const value = useMemo(
    () => ({
      children,
      mode,
      setMode,
      isDrawerOpen,
      toggleDrawer,
      handleClose,
      handleToggleMode,
      detailId,
      setDetailId,
      resetDrawerState,
    }),
    [
      children,
      handleClose,
      handleToggleMode,
      isDrawerOpen,
      mode,
      toggleDrawer,
      detailId,
      setDetailId,
      resetDrawerState,
    ],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  return useContext(DrawerContext) as DrawerProps;
}
