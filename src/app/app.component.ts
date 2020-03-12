import { Component } from '@angular/core';
import { ApiService } from './Services/api.service';
import { CommonModulesService } from './Services/common-modules.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angularBoilerPlate';
  message;

  constructor(private service : ApiService, public common: CommonModulesService)
  {

  }

  ngOnInit(){
  }

}
