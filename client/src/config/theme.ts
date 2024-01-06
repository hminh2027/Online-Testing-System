import type { ThemeConfig } from 'antd';
import type { ComponentToken } from 'antd/es/app/style';

export const colorScheme = {
  primary: '#1c375b',
  primaryHover: '#324b6b',
  white: '#ffffff',
  link: '#4172b3',
  activeLink: '#4172b3',
  borderError: '#cd4236',
  borderHover: '#08445e',
  placeholder: '#a4afbd',
  error: '#cd4236',
};

const fontFamily = '"Open Sans", "Segoe UI", "Helvetica Neue", "Arial"';

const FontSize = {
  HEADING1: 24,
  HEADING2: 20,
  HEADING3: 18,
  HEADING4: 16,
};

const LineHeight = {
  HEADING1: 32 / FontSize.HEADING1,
  HEADING2: 28 / FontSize.HEADING2,
  HEADING3: 24 / FontSize.HEADING3,
  HEADING4: 22 / FontSize.HEADING4,
};

const FontWeight = {
  STRONG: 700,
};

const FieldConfig: ComponentToken = {
  lineWidth: 1,
  colorBorder: colorScheme.primary,
  colorTextPlaceholder: colorScheme.placeholder,
  colorPrimaryHover: colorScheme.borderHover,
  colorPrimary: colorScheme.primaryHover,
};

const LinkConfig = {
  colorLink: colorScheme.link,
  colorLinkActive: colorScheme.activeLink,
  colorLinkHover: colorScheme.link,
};

const ButtonConfig = {
  controlHeight: 34,
  controlHeightLG: 44,
  controlOutlineWidth: 0,
  fontSize: 14,
  fontSizeLG: 14,
  fontWeight: 600,
  lineHeight: 20 / 14,
  lineHeightLG: 20 / 14,
  opacityLoading: 0.32,
  paddingInline: 16,
  // colorIcon: variables.neutralIconButton,
  // colorText: variables.neutralTextButton,
  // colorTextDisabled: variables.neutralTextDisabled,
  colorPrimary: colorScheme.primary,
  colorPrimaryHover: colorScheme.primaryHover,
  colorPrimaryActive: colorScheme.activeLink,
};

export const themeConfig: ThemeConfig = {
  token: {
    fontFamily,
    colorText: '#1c375b',
    borderRadius: 2,
    colorPrimaryBgHover: colorScheme.primaryHover,
    colorError: colorScheme.error,
    ...LinkConfig,
  },
  components: {
    Typography: {
      fontSizeHeading1: FontSize.HEADING1,
      fontSizeHeading2: FontSize.HEADING2,
      fontSizeHeading3: FontSize.HEADING3,
      fontSizeHeading4: FontSize.HEADING4,
      lineHeightHeading1: LineHeight.HEADING1,
      lineHeightHeading2: LineHeight.HEADING2,
      lineHeightHeading3: LineHeight.HEADING3,
      lineHeightHeading4: LineHeight.HEADING4,
      fontWeightStrong: FontWeight.STRONG,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Avatar: {
      fontSize: 14,
    },
    Form: {
      marginLG: 16,
    },
    Upload: {
      ...FieldConfig,
    },
    Tabs: {
      itemActiveColor: colorScheme.primary,
      itemSelectedColor: colorScheme.primary,
    },
    Layout: {
      bodyBg: colorScheme.white,
      siderBg: colorScheme.white,
      headerColor: '#000000',
    },
    Menu: {
      horizontalItemSelectedColor: colorScheme.primary,
      itemSelectedBg: colorScheme.primary,
      itemSelectedColor: colorScheme.white,
      itemBorderRadius: 2,
    },
    Badge: {
      statusSize: 10,
    },
    Pagination: {
      itemSize: 34,
      ...FieldConfig,
    },
    DatePicker: {
      ...FieldConfig,
    },
    Steps: {
      ...FieldConfig,
    },
    Select: {
      controlHeight: 34,
      optionActiveBg: colorScheme.primary,
      optionSelectedBg: colorScheme.primary,
      optionSelectedColor: colorScheme.white,
      ...FieldConfig,
    },
    Input: {
      colorBorder: colorScheme.primary,
      activeBorderColor: colorScheme.primary,
      hoverBorderColor: colorScheme.primary,
      controlHeight: 34,

      ...FieldConfig,
    },
    InputNumber: {
      colorBorder: colorScheme.primary,
      activeBorderColor: colorScheme.primary,
      hoverBorderColor: colorScheme.primary,
      ...FieldConfig,
    },
    Calendar: {
      ...FieldConfig,
    },
    Button: {
      ...ButtonConfig,
    },
    Switch: {
      colorPrimary: colorScheme.primary,
      colorPrimaryHover: colorScheme.primaryHover,
    },
  },
};
