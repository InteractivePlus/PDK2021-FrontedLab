import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { ProSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  headerTheme:'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '开放接口平台',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
  menu: {defaultOpenAll: true},//设置为默认展开
  // headerRender: false,
    // footerRender: false,
    // menuRender: false,
    // menuHeaderRender: false,
};

export default Settings;
