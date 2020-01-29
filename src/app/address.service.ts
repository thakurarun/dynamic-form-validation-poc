import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Address } from "./model";
@Injectable({
  providedIn: "root"
})
export class AddressService {
  private addresses: Address[] = [];
  addresses$ = new BehaviorSubject<Address[]>([]);
  idSeed = 0;

  constructor() {}

  updateAddress(address: Address): void {
    const existingAddress = this.addresses.find(a => a.id === address.id);
    if (existingAddress) {
      const modifiedAddress = { ...existingAddress, ...address };
      this.addresses = this.addresses.filter(a => a.id !== address.id);
      this.addresses = this.addresses.concat([modifiedAddress]);
    } else {
      address.id = this.idSeed++;
      this.addresses = this.addresses.concat([address]);
    }
    this.addresses$.next(this.addresses);
  }

  deleteAddress(id: number): void {
    const existingAddress = this.addresses.find(a => a.id === id);
    if (!existingAddress) {
      return;
    }
    this.addresses = this.addresses.filter(a => a.id !== id);
    this.addresses$.next(this.addresses);
  }
}
