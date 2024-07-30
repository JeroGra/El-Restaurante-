import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(private navCont:NavController) { }

  ngOnInit() {}

  ionViewDidEnter() {
    SplashScreen.hide();
    setTimeout(() => {
      this.navCont.navigateRoot(['/login']);
    }, 4000);
  }


}
