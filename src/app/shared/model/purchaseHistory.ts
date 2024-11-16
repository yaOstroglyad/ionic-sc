export enum PurchaseHistoryStatus {
  active = 'ACTIVE'
}

export interface PurchaseHistory {
  id: string,
  purchasedAt: string,
  name: string,
  status: PurchaseHistoryStatus,
}
