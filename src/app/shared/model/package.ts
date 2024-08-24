import { UsageInfo } from './usageInfo';

export interface Package {
  id: string,
  name: string,
  expiredAt: string,
  startedAt: string,
  status: string,
  usages: UsageInfo[]
}
