export interface ICreateSubscription {
  preapproval_plan_id: string;
  reason: string;
  email: string;
  cardTokenId: string;
  amount: number;
  billing_day: number;
}
