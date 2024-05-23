export interface SubscriberInfo {
  id: string,
  status: string,
  tags: string[],
  createdAt: string,
  iccid: string,
  imsi: string,
  msisdn: string,
  name?: string,
  simStatus: string,
  isPrimary: boolean
}
