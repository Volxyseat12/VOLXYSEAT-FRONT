export interface ISubscriptionProperties {
  support: boolean;
  phone: boolean;
  email: boolean;
  messenger: boolean;
  chat: boolean;
  liveSupport: boolean;
  documentation: boolean;
  onboarding: boolean;
  training: boolean;
  updates: boolean;
  backup: boolean;
  customization: boolean;
  analytics: boolean;
  integration: boolean;
  apiAccess: boolean;
  cloudStorage: boolean;
  multiUser: boolean;
  prioritySupport: boolean;
  sla: boolean;
  serviceLevel: boolean;
}

export interface PropertyCategoryMapping {
  [key: string]: { name: string; key: keyof ISubscriptionProperties }[];
}
