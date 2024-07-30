import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  // FALTA CONFIGURAR ANDROID MANIFEST

  public scan : boolean = false
  public content_visibility : any = ""
  public scanResult : any = ""


  constructor() { }

  async CheckPermission() {
    try
    {
      const status = await BarcodeScanner.checkPermission({force:true}); 
      console.log(status)
      if(status.granted) {
        return true;
      }

      return false;

    }
    catch(e)
    {
      return undefined;
    }
  }

  async StartScan() {

    if(!this.scan) {
      this.scan = true;
      try 
      {
        const permission = await this.CheckPermission();
        if(!permission) {
        }else {
          await BarcodeScanner.hideBackground();
          document.querySelector('body')?.classList.add('scanner-active');
          this.content_visibility = 'hidden';
          const result = await BarcodeScanner.startScan();
          console.log(result)
          this.content_visibility = '';
          BarcodeScanner.showBackground();
          document.querySelector('body')?.classList.remove('scanner-active');
          this.scan = false;
          if(result?.hasContent) {
            this.scanResult = result.content;
            console.log(this.scanResult)
          }
        }
      }
      catch(e)
      {
          console.log(e);
      }
    } else {
      this.scan = false;
      this.StopScan();
    }

  }

  StopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }


}
