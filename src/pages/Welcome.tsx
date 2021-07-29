import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';


export default (): React.ReactNode => {
  
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'空白页'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        
      </Card>
    </PageContainer>
  );
};
