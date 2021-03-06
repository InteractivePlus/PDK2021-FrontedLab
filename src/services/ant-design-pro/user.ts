// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 注册用户 注册用户 POST /api/user */
export async function createUser(
  params: {
    // path
  },
  body: { username?: string; email?: string; password?: string; captcha_id?: string },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<any>('/api/user', {
    method: 'POST',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /user/createWithArray */
export async function createUsersWithArrayInput(
  params: {
    // path
  },
  body: API.User[],
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<any>('/user/createWithArray', {
    method: 'POST',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /user/createWithList */
export async function createUsersWithListInput(
  params: {
    // path
  },
  body: API.User[],
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<any>('/user/createWithList', {
    method: 'POST',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Logs user into the system GET /user/login */
export async function loginUser(
  params: {
    // query
    /** The user name for login */
    username: string;
    /** The password for login in clear text */
    password: string;
    // path
  },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<string>('/user/login', {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Logs out current logged in user session GET /user/logout */
export async function logoutUser(
  params: {
    // path
  },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<any>('/user/logout', {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get user by user name GET /user/${param0} */
export async function getUserByName(
  params: {
    // path
    /** The name that needs to be fetched. Use user1 for testing.  */
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<API.User>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Updated user This can only be done by the logged in user. PUT /user/${param0} */
export async function updateUser(
  params: {
    // path
    /** name that need to be updated */
    username: string;
  },
  body: API.User,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete user This can only be done by the logged in user. DELETE /user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** The name that needs to be deleted */
    username: string;
  },
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
