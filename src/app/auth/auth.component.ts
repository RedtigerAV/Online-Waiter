import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private router: Router,
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
    const user = new User(
      this.form.get('name').value,
      this.form.get('barcode').value
    );

    this.userService.setUser(user);
    this.router.navigate(['../']);
  }
}

