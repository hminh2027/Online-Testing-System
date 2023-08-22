import type { ThemeConfig } from 'antd';

const fontFamily = '"Open Sans", "Segoe UI", "Helvetica Neue", "Arial"';

const themeConfig: ThemeConfig = {
  token: {
    fontFamily,
  },
  components: {
    Avatar: {
      fontSize: 14,
    },
  },
};

export default themeConfig;
