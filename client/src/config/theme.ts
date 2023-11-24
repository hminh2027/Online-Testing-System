import type { ThemeConfig } from 'antd';

const fontFamily = '"Open Sans", "Segoe UI", "Helvetica Neue", "Arial"';

export const themeConfig: ThemeConfig = {
  token: {
    fontFamily,
  },
  components: {
    Avatar: {
      fontSize: 14,
    },
    Form: {
      marginLG: 16,
    },
    Layout: {
      bodyBg: '#FFFFFF',
      siderBg: '#FFFFFF',
    },
  },
};
