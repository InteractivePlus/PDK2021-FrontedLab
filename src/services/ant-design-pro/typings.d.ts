// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };

  type UserCreate = {
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    captcha_id?: string;
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };
}
