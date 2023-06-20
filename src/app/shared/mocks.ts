import { UsageInfo } from './model/usageInfo';

export const subscriberInfoMock = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  offerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  iccid: '12332221123221',
  loginName: '06032228112',
  password: 'string',
  email: 'incredible@gmail.com',
  phoneNumber: '06032228112',
  firstName: 'Incr',
  lastName: 'Edible'
}

export const subscriberUsageMock = {
  data: [
    {
      name: 'Unlimited',
      total: 100,
      used: 1,
      remaining: 99,
      unitType: UsageInfo.UnitTypeEnum.Gb
    }
  ]
}
