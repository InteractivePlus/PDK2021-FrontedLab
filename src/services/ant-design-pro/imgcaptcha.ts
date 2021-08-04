// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 申请验证码 调试工具https://jaredwinick.github.io/base64-image-viewer/，或data:image/jpeg;base64,{base64} GET /api/captcha */
export async function getCaptcha(
  params: {
    // query
    /** 宽度 */
    width?: string;
    /** 高度 */
    height?: string;
    // path
  },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<any>('/api/captcha', {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 提交验证码 GET /api/captcha/${param0}/submitResult */
export async function submitCaptcha(
  params: {
    // query
    /** 图片验证码的文字 */
    phrase: string;
    // path
    /** 验证会话id */
    captcha_id: string;
  },
  options?: { [key: string]: any },
) {
  const { captcha_id: param0, ...queryParams } = params;
  return request<any>(`/api/captcha/${param0}/submitResult`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
