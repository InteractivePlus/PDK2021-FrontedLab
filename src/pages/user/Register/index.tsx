import React from 'react';
import { useState, useEffect } from 'react';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message, Alert, Space, Tabs } from 'antd';
import { Image, Spin } from 'antd';
import type { FormInstance } from 'antd';
import type { Store } from 'antd/es/form/interface';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText, ProFormSelect, ProFormRadio   } from '@ant-design/pro-form';
import { useIntl, Link, history, useRequest, FormattedMessage, SelectLang, useModel } from 'umi';

import Footer from '@/components/Footer';
import FormTextCaptcha from '@/components/FormTextCaptcha';


import type { StateType } from './service';
import { fakeRegister } from './service';

import { getCaptcha } from '@/services/ant-design-pro/imgcaptcha';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [count, setCount]: [number, any] = useState(0);
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;

  const [form] = Form.useForm();

  const intl = useIntl();

  
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );


  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  // const { loading: submitting, run: register } = useRequest<{ data: StateType }>(fakeRegister, {
  //   manual: true,
  //   onSuccess: (data, params) => {
  //     if (data.status === 'ok') {
  //       message.success('注册成功！');
  //       history.push({
  //         pathname: '/user/register-result',
  //         state: {
  //           account: params.email,
  //         },
  //       });
  //     }
  //   },
  // });
  const onFinish = (values: Store) => {
    register(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const onChange = (e: any) => {
    console.log('Change:', e.target.value);
  };
  
  const handleSubmit = async (values: any) => {
    // 注册
    // 参数values实际没用上，换成了form.getFieldsValue(true)
    setSubmitting(true);
    try {
      // 如果有confirmpwd属性，需要删除，不作为提交参数
      // if(values['confirmpwd'])
      //   delete values['confirmpwd'];

      console.log(form.getFieldsValue(true));
      // const msg = await login({ ...values, type });
      // if (msg.status === 'ok') {
      //   const defaultloginSuccessMessage = intl.formatMessage({
      //     id: 'pages.login.success',
      //     defaultMessage: '登录成功！',
      //   });
      //   message.success(defaultloginSuccessMessage);
      //   await fetchUserInfo();
      //   goto();
      //   return;
      // }
      // // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
        defaultMessage: '注册失败，请重试！',
      });

      message.error(defaultloginFailureMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.png" />
              <span className={styles.title}>注册您的账号</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            form={form}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.register.submit',
                  defaultMessage: '注册',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              // handleSubmit(values as API.LoginParams);
              handleSubmit(values);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.username.placeholder',
                defaultMessage: '用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.email.placeholder',
                defaultMessage: '邮箱',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.email.required"
                      defaultMessage="请输入邮箱!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              // name="confirmpwd"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致！'));
                  },
                }),
              ]}
            />
            
            <Form.Item>
              <FormTextCaptcha form={form} onChange={(e: any) => { }}/>
            </Form.Item>
          </ProForm>

          <div>
            注册即代表您同意
            <Link to="/">
              <span>用户协议</span>
            </Link>
          </div>

          <Link className={styles.login} to="/user/login">
            <span>登录账户</span>
          </Link>
          <Space className={styles.other}></Space>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
