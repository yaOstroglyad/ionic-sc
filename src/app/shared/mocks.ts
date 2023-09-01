import { UsageInfo } from './model/usageInfo';

export const subscribersInfoMock = [
  {
    id: '3fb85f64-5717-4562-b3fc-2c963f66afa6',
    status: "active",
    tags: [
      "string"
    ],
    createdAt: "2023-09-01T12:31:04.633Z",
    iccid: '12332221123221',
    imsi: "string",
    msisdn: "06032228112",
    simStatus: "active",
    isPrimary: true
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    status: "active",
    tags: [
      "string"
    ],
    createdAt: "2023-09-01T12:31:04.633Z",
    iccid: '12332221123222',
    imsi: "string",
    msisdn: "06032228000",
    simStatus: "active",
    isPrimary: false
  }
]

export const subscriberUsagesMock = [
  {
    id: '123213uy6127321321',
    name: 'Unlimited',
    usages: [
      {
        type: UsageInfo.UsageTypeEnum.data,
        total: 100,
        used: 1,
        remaining: 99,
        unitType: UsageInfo.UnitTypeDataEnum.Gb
      },
      {
        type: UsageInfo.UsageTypeEnum.sms,
        total: 100,
        used: 1,
        remaining: 99,
        unitType: UsageInfo.UnitTypeAmountEnum.Sms
      },
      {
        type: UsageInfo.UsageTypeEnum.voice,
        total: 5000,
        used: 32,
        remaining: 4968,
        unitType: UsageInfo.UnitTypeAmountEnum.Min
      }
    ]
  },
  {
    id: '123212113uy6127321321',
    name: 'VIP',
    usages: [{
      type: UsageInfo.UsageTypeEnum.data,
      total: 100,
      used: 1,
      remaining: 99,
      unitType: UsageInfo.UnitTypeDataEnum.Gb
    }]
  }
];

export const secondSubscriberUsagesMock = [
  {
    id: '333213uy6127321321',
    name: 'EU simple data',
    usages: [
      {
        type: UsageInfo.UsageTypeEnum.data,
        total: 10,
        used: 1,
        remaining: 9,
        unitType: UsageInfo.UnitTypeDataEnum.Gb
      }
    ]
  }
];
