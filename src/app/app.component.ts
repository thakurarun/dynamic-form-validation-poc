import { Component } from "@angular/core";
import { AddressService } from "./address.service";
import { map } from "rxjs/operators";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from "@angular/forms";
import { Address } from "./model";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Address Book";

  addressForms$ = this.addressService.addresses$.pipe(
    map(addresses =>
      this.fb.array(
        addresses
          .sort((a, b) => (a.id > b.id ? -1 : 1))
          .map(address => this.createForm(address))
      )
    )
  );

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) {}

  addAddress(): void {
    const newAddress = {
      id: -1,
      street: "",
      state: "",
      country: "",
      city: "",
      district: "",
      postalCode: ""
    };
    this.addressService.updateAddress(newAddress);
  }

  saveAddress(address: Address): void {
    var result = confirm(JSON.stringify(address));
    if (result) {
      this.addressService.updateAddress(address);
    }
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id);
  }

  f(form: FormGroup, controlName: string): AbstractControl {
    return form.get(controlName);
  }

  private createForm(address: Address): FormGroup {
    const formGroup = this.fb.group(address);
    // add validations
    this.f(formGroup, "street").setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]);
    this.f(formGroup, "city").setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]);
    this.f(formGroup, "district").setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]);
    this.f(formGroup, "postalCode").setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
      Validators.pattern("^[A-Z0-9]*$")
    ]);
    this.f(formGroup, "state").setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]);
    this.f(formGroup, "country").setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]);
    return formGroup;
  }
}
