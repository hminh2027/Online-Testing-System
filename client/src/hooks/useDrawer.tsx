import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useToggle } from 'react-use';

import { Button, Space } from 'antd';
import { MODE } from '@/constants/status';

type ContentConfig = Record<keyof typeof MODE, ReactElement>;

interface DrawerProps {
  isDrawerOpen: boolean;
  mode: MODE;
  handleCancel: () => void;
  handleClose: () => void;
  toggleMode: (targetMode: MODE) => void;
  detailId: number | string;
  setDetailId: (id: number | string) => void;
  resetDrawerState: () => void;
  genTitle: () => string | null;
  genFooter: () => ReactElement | null;
  genContent: (content: ContentConfig) => ReactElement | null;
}

const DrawerContext = createContext({});

export function DrawerContextProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<MODE | null>(null);
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const [detailId, setDetailId] = useState<number | null | string>(null);

  const resetDrawerState = useCallback(() => {
    toggleDrawer(false);
    setDetailId(null);
    setMode(null);
  }, [toggleDrawer]);

  const handleClose = useCallback(() => resetDrawerState(), [resetDrawerState]);

  const toggleMode = useCallback(
    (targetMode: MODE) => {
      setMode(targetMode);
      toggleDrawer(true);
    },
    [toggleDrawer],
  );

  const genTitle = useCallback(() => {
    switch (mode) {
      case MODE.ADD:
        return 'Tạo Mới';

      case MODE.EDIT:
        return 'Chỉnh Sửa';

      case MODE.DETAIL:
        return 'Thông Tin Chi Tiết';

      default:
        return null;
    }
  }, [mode]);

  const genFooter = useCallback(() => {
    if (mode === MODE.ADD || mode === MODE.EDIT) {
      return (
        <Button block type="primary">
          Lưu
        </Button>
      );
    }

    return null;
  }, [mode]);

  const genContent = useCallback(
    (content: ContentConfig) => {
      switch (mode) {
        case MODE.ADD:
          return content.ADD;

        case MODE.EDIT:
          return content.EDIT;

        case MODE.DETAIL:
          return content.DETAIL;

        default:
          return null;
      }
    },
    [mode],
  );

  const value = useMemo(
    () => ({
      children,
      mode,
      isDrawerOpen,
      handleClose,
      toggleMode,
      detailId,
      setDetailId,
      resetDrawerState,
      genTitle,
      genFooter,
      genContent,
    }),
    [
      children,
      handleClose,
      toggleMode,
      isDrawerOpen,
      mode,
      detailId,
      setDetailId,
      resetDrawerState,
      genTitle,
      genFooter,
      genContent,
    ],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  return useContext(DrawerContext) as DrawerProps;
}
