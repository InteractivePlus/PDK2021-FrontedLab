import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  var year = new Date().getFullYear();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '形随意动',
  });

  return (
    <DefaultFooter
      copyright={`${year} ${defaultMessage}`}
      links={[]}
    />
  );
};
