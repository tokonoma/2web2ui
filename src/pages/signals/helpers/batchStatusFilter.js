import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import { batchStatusOptions } from './../constants/integration';
const getLegitBatchStatus = (str) => batchStatusOptions.map((y) => y.value).indexOf(str) > -1 ? [str] : [];
const getLegitPageSize = (pageSize) => pageSize ? DEFAULT_PER_PAGE_BUTTONS.indexOf(pageSize) > -1 ? pageSize : 10 : 10;
export { getLegitBatchStatus, getLegitPageSize };
