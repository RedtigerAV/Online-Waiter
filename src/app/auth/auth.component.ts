import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'auth',
  templateUrl: './auth.template.html',
  styleUrls: ['./auth.style.less']
})
export class AuthComponent implements AfterViewInit {

  @ViewChild(BarecodeScannerLivestreamComponent)
  BarecodeScanner: BarecodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
    this.BarecodeScanner.start();
  }

  onValueChanges(value) {
    this.barcodeValue = value.code;
  }
}

