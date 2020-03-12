import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModulesService } from 'src/app/Services/common-modules.service';
import { ApiService } from 'src/app/Services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msg: string = "";
  msgArray = [];
  load: boolean = true;
  sendersId : number;
  recieversId = {
    id: "",
    name: ""
  };

  @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

  constructor(private common : CommonModulesService, private service: ApiService, private route : ActivatedRoute) { }

  ngOnInit() {
   

    this.recieversId={
      id : this.route.snapshot.params['recieverId'],
      name: this.route.snapshot.params['recieverId'],
    };

    this.route.params.subscribe((params: Params)=> {
      this.recieversId.id = params['recieverId'];
      this.recieversId.name = params['name'];
      this.sendersId = this.common.getData('userInfo').id;
      this.getListOfMessage();
    });

     this.service
      .getMessages()
      .subscribe((message) => {
        if(message.user_id_sender != this.sendersId){
          this.msgArray.push(message.message.message);
          this.scrollToBottom();
        }
      });
  }

  sendMessage(){
    this.load = true;
    let data = {
      type : 'POST',
      url : `http://localhost:3001/chat/send`,
      header : {Authorization: `Bearer ${this.common.getData('token')}`},
      data : {
        "message": this.msg,
        "userIdSender": this.sendersId,
        "userIdReciever": parseInt(this.recieversId.id)
      },
    }
    console.log(data);

    this.service.apiService(data).subscribe((res)=>{
      console.log(res)
      this.msg = "";
    },err => {
      this.common.showErr(err.error.message);
      this.load = false;
    })

  }

  getListOfMessage(){
    this.load = true;
    let data = {
      type : 'GET',
      url : `http://localhost:3001/chat/chats/${this.common.getData('userInfo').id}/${this.recieversId.id}`,
      header : {Authorization: `Bearer ${this.common.getData('token')}`}
    }

    this.service.apiService(data).subscribe((res)=>{
      if(res.body.messages.length != 0){
        this.msgArray = res.body.messages;
      }

      this.load = false;
    },err => {
      this.common.showErr(err.error.message);
      this.load = false;
    })
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 500;
    } catch(err) { }                 
}

}
