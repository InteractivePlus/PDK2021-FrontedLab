import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/es/hooks/useMergedState';

import { FormInstance, Rule } from './interface';


import { Form, Col, Input, Row, message, Alert, Image, Spin } from 'antd';
import { ProFormText } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import { getCaptcha, submitCaptcha } from '@/services/ant-design-pro/imgcaptcha';

import classNames from 'classnames';
import styles from './index.less';

export type FormTextCaptchaProps = {
  value?: string | undefined;
  onChange?: (value?: string) => void | undefined;
  rules?: Rule[] | undefined;                      // 校验规则
  placeholder?: string | undefined;                // 占位符
  form?: FormInstance | undefined;                 // 表单实例引用，用于添加captcha_id
  onValidate?: () => void | undefined;             // 验证通过后的回调函数
};

enum CaptchaStatus {
  empty = "",
  success= "success",
  error = "error",
  validating = "validating",
}

const FormTextCaptcha: React.FC<FormTextCaptchaProps> = (props) => {
  const { placeholder, rules, form, onValidate, ...restProps } = props;

  const [value, setValue] = useMergedState<string | undefined>('', {
    value: props.value,
    onChange: props.onChange,
  });

  const [captchaImgSrc, setCaptchaImgSrc] = useState<string>('');
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [captchaStatus, setcaptchaStatus] = useState<CaptchaStatus>(CaptchaStatus.empty);

  const intl = useIntl();

  const loadingIcon = <LoadingOutlined spin />;

  // : React.ReactEventHandler<HTMLElement>
  const handlerGetCaptcha = async () => {
    setCaptchaLoading(true);
    await getCaptcha({}).then(({ data }) => {
      setCaptchaImgSrc(`data:image/jpeg;base64,${data.captcha_data.jpegBase64}`);
      // 直接填入表单，不过没有文本框显示
      form.setFieldsValue({
        captcha_id: data.captcha_id,
      });
      // console.log(form.getFieldValue('captcha_id'));
    });
    setCaptchaLoading(false);
  };

  const handlerVerifyCaptcha = async () => {
    console.log('verifying');
    
    // 设置验证状态
    setcaptchaStatus(CaptchaStatus.validating);
    await submitCaptcha({
      phrase: value as string,
      captcha_id: form.getFieldValue('captcha_id'),
    }).then(
      (response) => {
        // message.success('验证码正确');
        // 设置成功状态
        setcaptchaStatus(CaptchaStatus.success);
        console.log(response);
      },
      (err) => {
        // message.error('验证码未通过');
        // console.log(err);
        // 设置失败状态
        setcaptchaStatus(CaptchaStatus.error);
        handlerGetCaptcha();
      },
    );
  };

  React.useEffect(() => {
    handlerGetCaptcha();
  }, []);

  React.useEffect(() => {
    if (value?.length === 5) {
      handlerVerifyCaptcha();
    }
  }, [value]);

  React.useEffect(() => {
    if (captchaStatus === CaptchaStatus.success) {
      onValidate?.();
    }
  }, [captchaStatus]);

  return (
    <div>
      <Row>
        <Col span={14}>
          {/* 由于是item套item(proformtext)所以会有两倍的bottom，取消掉 */}
          <Form.Item style={{ marginBottom: 0 }} hasFeedback validateStatus={captchaStatus}>
            <Input
              size="large"
              maxLength={5}
              value={value}
              disabled={captchaStatus === CaptchaStatus.success}
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              placeholder={intl.formatMessage({
                id: 'pages.captcha.placeholder',
                defaultMessage: '验证码',
              })}
            />
          </Form.Item>
        </Col>
        <Col span={1}></Col>
        <Col span={9}>
          <div className={styles.captchaimgContainer}>
            <Spin indicator={loadingIcon} spinning={captchaLoading}>
              <Image
                width={110}
                height={32}
                style={!captchaStatus?{ cursor: 'pointer' }:{}}
                src={captchaImgSrc}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                preview={false}
                onClick={() => {
                  if (captchaStatus !== CaptchaStatus.success) {
                    // 设置验证状态
                    setcaptchaStatus(CaptchaStatus.empty);
                    handlerGetCaptcha();
                  }
                }}
              />
            </Spin>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormTextCaptcha;
