import config from '.';
import { SPC_TENANT, SPC_EU_TENANT } from 'src/constants';

export const inSPC = () => config.tenantId === SPC_TENANT;
export const inSPCEU = () => config.tenantId === SPC_EU_TENANT;
