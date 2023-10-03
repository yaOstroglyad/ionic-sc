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
    "id": "16136b9b-0eb3-45b9-82d3-16db631144d5",
    "name": "[602] Egypt",
    "usages": [
      {
        "type": "data",
        "unitType": "BYTE",
        "total": 1.073741824E9,
        "used": 322122547,
        "remaining": 751619277
      }
    ]
  },
  {
    "id": "00b2f085-32d3-46c5-a376-2a36e2f66e5a",
    "name": "[286] Turkey",
    "usages": [
      {
        "type": "data",
        "unitType": "BYTE",
        "total": 1.073741824E9,
        "used": 0.0,
        "remaining": 1.073741824E9
      }
    ]
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
