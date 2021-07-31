// api common response codes...
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED' // if the api key is not provided
export const IP_NOT_AUTHORIZED = 'IP_NOT_AUTHORIZED' // ip address not provided during making api request or the ip is banned

export const SUCCESS = 'SUCCESS' // api returned something with success status
export const FAILED = 'FAILED' // api returned this when the request is not completed with success
export const ERROR = 'ERROR' // api returned something with error status
export const WARNING = 'WARNING' // api returned something with warning status
export const DANGER = 'DANGER' // api returned something with danger status
export const PARTIAL_SUCCESS = 'PARTIAL_SUCCESS' // when a task is half completed like we are adding new user but could not provide the details after adding the user

// authentication codes...
export const SIGNIN_FAILED = 'SIGNIN_FAILED' // error during sign in failed
export const SIGNUP_FAILED = 'SIGNUP_FAILED' // error during sign up failed

// useful codes...
export const PROVIDED_INCOMPLETE_DATA = 'PROVIDED_INCOMPLETE_DATA' // may be full data is not provided like email, password, username etc
export const EMAIL_PATTERN_NOT_MATCHED = 'EMAIL_PATTERN_NOT_MATCHED' // email does not match or invalid email id provided
export const SHORT_PASSWORD = 'SHORT_PASSWORD' // the password provided is short than the min length of password
export const SHORT_USERNAME = 'SHORT_USERNAME' // the username provided is short than the min length of username
export const EMAIL_LENGTH_EXCEED = 'EMAIL_LENGTH_EXCEED' // the email length exceed the max email length default of 320
export const USERNAME_LENGTH_EXCEED = 'USERNAME_LENGTH_EXCEED' // the email length exceed the max email length default of 320
export const PASSWORD_LENGTH_EXCEED = 'PASSWORD_LENGTH_EXCEED' // the email length exceed the max email length default of 320
export const TEMPORARY_EMAIL_IS_NOT_ALLOWED = 'TEMPORARY_EMAIL_IS_NOT_ALLOWED' // if any user tried to log in using any temporary email just return error
export const USER_ID_NOT_PROVIDED = 'USER_ID_NOT_PROVIDED' // if any user tried to log in using any temporary email just return error

export const USER_ALREADY_EXIST = 'USER_ALREADY_EXIST' // this constant could be used when signing up new user and duplicate email are found which also exist in database
export const USER_NOT_FOUND = 'USER_NOT_FOUND' // user not found in database
export const WRONG_PASSWORD = 'WRONG_PASSWORD' // wrong password during login...
export const USER_ACCOUNT_IS_DISABLED = 'USER_ACCOUNT_IS_DISABLED' // while fetching data if the user is disabled then this response should be provided
