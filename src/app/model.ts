export interface Address {
  id: number;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  state: string;
  country: string;
}

export enum AddressState {
  NEW,
  EXISITNG
}
