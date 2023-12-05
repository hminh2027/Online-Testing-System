import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useToggle } from 'react-use';

import { Button, Modal } from 'antd';
import { MODE } from '@/constants/status';

type ContentConfig = Record<keyof typeof MODE, ReactElement>;

interface DrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  mode: MODE;
  handleClose: () => void;
  toggleMode: (targetMode: MODE) => void;
  detailId: number | string;
  setDetailId: (id: number | string) => void;
  resetDrawerState: () => void;
  genTitle: () => string | null;
  genFooter: (submitHandler: () => void) => ReactElement | null;
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

  const handleClose = useCallback(() => {
    if (mode === MODE.DETAIL) return resetDrawerState();

    return Modal.confirm({
      onOk: () => resetDrawerState(),
      centered: true,
      okText: 'Đóng',
      cancelText: 'Quay lại',
      title: 'Bạn có chắc muốn đóng?',
      content: 'Nội dung bạn đã chỉnh sửa sẽ không được lưu lại, bạn có tiếp tục muốn đóng?',
    });
  }, [mode, resetDrawerState]);

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

  const genFooter = useCallback(
    (submitHandler: () => void) => {
      if (mode === MODE.ADD || mode === MODE.EDIT) {
        return (
          <Button onClick={submitHandler} block type="primary">
            Lưu
          </Button>
        );
      }

      return null;
    },
    [mode],
  );

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
      toggleDrawer,
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
      toggleDrawer,
    ],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  return useContext(DrawerContext) as DrawerProps;
}
