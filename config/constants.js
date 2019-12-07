export const ROWS_PER_PAGE_ON_TABLE = 10
export const AUTH_STRATEGY = 'local'
export const URL_MAP_REG_EX = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
export const USER_FILE_MAX_SIZE = {
  label: '2MB',
  length: 2097153, // (bytes units) ~ 2097152 bytes = 2mb
}