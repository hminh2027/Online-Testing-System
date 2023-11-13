import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';

enum ItemsName {
  modify = 'modify',
  view = 'view',
  download = 'download',
  delete = 'delete',
  launch = 'launch',
  unassign = 'unassign',
}

type ConfigProps = Record<ItemsName, ItemType>;
type InputConfigProps = Partial<Record<ItemsName, MenuItemType['onClick']>>;

const defaultConfig: ConfigProps = {
  modify: {
    label: 'Chỉnh sửa',
    key: 'Chỉnh sửa',
    icon: <EditOutlined />,
  },
  view: {
    label: 'Xem',
    key: 'Xem',
    icon: <EyeOutlined />,
  },
  delete: {
    label: 'Xóa',
    key: 'Xóa',
    icon: <DeleteOutlined />,
  },
  unassign: {
    label: 'Hủy giao bài',
    key: 'Hủy giao bài',
    icon: <DeleteOutlined />,
  },
  download: {
    label: 'Tải về',
    key: 'Tải về',
    icon: <DownloadOutlined />,
  },
  launch: {
    label: 'Làm bài',
    key: 'Làm bài',
    icon: <PlayCircleOutlined />,
  },
};

export const genDropdownItems = (config: InputConfigProps): MenuProps['items'] => {
  const menuItems = Object.entries(config).map((item) => {
    const [key, onClickFn] = item as [keyof typeof ItemsName, MenuItemType['onClick']];

    const defaultItem = defaultConfig[key];

    return {
      ...defaultItem,
      onClick: onClickFn,
      key,
    };
  });

  return menuItems satisfies MenuItemType[];
};
