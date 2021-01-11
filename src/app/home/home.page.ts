import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  code = 68426749;
  weekNumber = this.getWeekNumber();
  year = (new Date().getMonth() === 0 && this.weekNumber >= 52) ? new Date().getFullYear() - 1 : new Date().getFullYear();

  width = 800;
  height = 1920;

  sliderOpt = {
    zoom: {
      maxRatio: 2
    }
  };

  constructor(private pickerController: PickerController, private storage: Storage, private screenOrientation: ScreenOrientation) {
    this.getCodeData();
    this.getScreenOrientation();
  }

  getCodeData() {
    this.storage.get('code').then((val) => {
      this.code = val;
    });
  }

  getWeekNumber() {
    const d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((Number(d) - Number(yearStart)) / 86400000) + 1) / 7);
  }
  
  btnToday() {
    this.weekNumber = this.getWeekNumber();
  }

  btnBack() {
    this.weekNumber --;
  }

  btnForward() {
    this.weekNumber ++;
  }

  async showPicker() {
    let picker = await this.pickerController.create({
      buttons: [
        {
          text:'Ok'
        }
      ],
      columns:[{
        name:'groupe',
        options: [
          {text: 'M2 SA', value: '68419887'},
          {text: 'M2 SR', value: '68419888'},
          {text: 'M2 MIAGE I.', value: '68419883'},
          {text: 'M2 MIAGE A.', value: '6'},

          {text: 'M1 INFO G1', value: '68425740'},
          {text: 'M1 INFO G2', value: '68425741'},
          {text: 'M1 INFO SA', value: '68426833'},
          {text: 'M1 INFO SR', value: '68426834'},
          {text: 'M1 MIAGE I.', value: '68419919'},
          {text: 'M1 MIAGE A.', value: '68419886'},

          {text: 'L3 SA', value: '68419893'},
          {text: 'L3 SR', value: '68419892'},
          {text: 'L3 MIAGE I.', value: '68419891'},
          {text: 'L3 MIAGE A.', value: '7'},
          {text: 'L3 DOUBLE', value: '68426751'},

          {text: 'L2 INFO G1', value: '68426361'},
          {text: 'L2 INFO G2', value: '68426362'},
          {text: 'L2 INFO G3', value: '68426891'},
          {text: 'L2 INFO G4', value: '68426987'},

          {text: 'L1 MI G1', value: '18'},
          {text: 'L1 MI G2', value: '8'},
          {text: 'L1 MI G3', value: '68426495'},
          {text: 'L1 MI G4', value: '68426747'},
          {text: 'L1 MI G5', value: '68426748'},
          {text: 'L1 MI G6', value: '68426749'},
          {text: 'L1 SDVI', value: '68424877'}
        ]
      }]
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('groupe');
      this.code = col.options[col.selectedIndex].value;
      this.storage.set('code', this.code);
    });
  }

  getScreenOrientation() {
    this.screenOrientation.onChange().subscribe(
      () => {
        if (this.screenOrientation.type === 'landscape-primary' || this.screenOrientation.type === 'landscape-secondary') {
          this.width = 1920;
          this.height = 1080;
        } else {
          this.width = 800;
          this.height = 1920;
        }
      }
    );
  }

}
