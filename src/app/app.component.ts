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
   

    // this.service
    // .getMessages()
    // .subscribe((message: string) => {
    //   console.log(message);
    // });
  }


  buttonClick(){
     let data = {
      type : 'POST',
      url : 'http://localhost:3001/chat/send',
      data : {
        "message": "test message",
        "userIdSender": 1,
        "userIdReciever": 3
      },
      header : {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAuc2FodUB0aGVzeW5hcHNlcy5jb20iLCJsb2FkZWRVc2VyIjoiMSIsImlhdCI6MTU4Mzg1NzI4NCwiZXhwIjoxNTgzOTQzNjg0fQ.R8E5oZih4zyRbLcSf2AkHB3HhSbaZ1tAQYaxz4spdso'}
    }

    this.service.apiService(data).subscribe((res)=>{
      console.log(res);
    });
  }

  sendMessage(message) {
    this.service.sendMessage(this.message);
    this.message = message;
  }

}
