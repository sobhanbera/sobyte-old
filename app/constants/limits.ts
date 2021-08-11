/**
 * this file contains all those limits constant like
 * max length, min length and such things...
 */

// authentication constants..
export const MAX_EMAIL_LENGTH = 320
export const MAX_USERNAME_LENGTH = 30
export const MIN_USERNAME_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 8

// limit of connection to mysql at once...
export const MAX_SQL_CONCURRENT_CONNECTION = 1000000000000 // default mysql connection limit is 10 at once

export const HASHING_MAX_SALT = 10 // the max salt for hashing string (mainly for password)

export default 'constants for limits'
