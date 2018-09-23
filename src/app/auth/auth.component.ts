import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.template.html',
  styleUrls: ['./auth.style.less']
})
export class AuthComponent implements OnInit{

  @ViewChild(BarecodeScannerLivestreamComponent)
  scanner: BarecodeScannerLivestreamComponent;

  isBarcodeVisible = false;
  form: FormGroup;

  constructor(private changeDetector: ChangeDetectorRef,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      barcode: this.fb.control({value: '', disabled: true}, [Validators.required])
    });
  }

  scanCode() {
    this.isBarcodeVisible = true;
    this.changeDetector.detectChanges();
    this.scanner.start();
  }

  codeScanned(value) {
    this.form.get('barcode').setValue(value.code);
    this.isBarcodeVisible = false;
  }

  isFormValid(): boolean {
    return Object.keys(this.form.controls).every(control => {
      const controlStatus = this.form.get(control).status;
      return controlStatus === 'VALID'
        || (controlStatus === 'DISABLED' && !!this.form.get(control).value);
    });
  }

  onLogin() {
    const name = this.form.get('name').value;
    const table = this.form.get('barcode').value.toString().slice(0, 2);
    const isAdmin = this.form.get('barcode').value.toString().endsWith(1234);
    const user = new User(
      name,
      table,
      isAdmin
    );

    this.userService.setUser(user);
  }
}

