import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class CommonModulesService {

  errMessage : string = "";
  errBool : boolean = false;

  constructor(public local : LocalStorageService) { }

  showErr(message){
    this.errBool = true;
    this.errMessage = message;
    setTimeout(() => {
      this.errBool = false;
    }, 3000);
  }

  getData(key) {
    var fetchData = this.local.get(btoa(key));
    if (fetchData) {
      return JSON.parse(atob(fetchData));
    } else {
      return false;
    }
  }

  setData(key, data) {
    var storeData = btoa(JSON.stringify(data));
    this.local.set(btoa(key), storeData);
    return true;
  }


}
