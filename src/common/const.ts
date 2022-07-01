/* eslint-disable import/no-mutable-exports */
/**
 * 主机地址
 */
export let BASE_HOST = ''
export let BASE_API = '/api/'
export let UPLOAD_API = `${BASE_HOST}/api/file/qcts/upload`
export const File_Pre_Host = 'https://qcts.cdn.bcebos.com'

// #ifdef MP
BASE_HOST = 'https://www.qctsw.com'
BASE_API = `${BASE_HOST}/api/`
UPLOAD_API = `${BASE_HOST}/api/file/qcts/upload`
// #endif
