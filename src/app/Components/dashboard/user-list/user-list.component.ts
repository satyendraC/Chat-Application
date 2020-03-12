import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CommonModulesService } from 'src/app/Services/common-modules.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users : [] = [];
  constructor(private service : ApiService, private common: CommonModulesService, private router : Router, private auth : AuthenticationService) { }


  ngOnInit() {
    this.userList();
  }

  userList(){
    let data = {
      type : 'GET',
      url : `http://localhost:3001/feed/userlist/${this.common.getData('userInfo').id}`,
      header: {Authorization: `Bearer ${this.common.getData('token')}`}
    }

    this.service.apiService(data).subscribe((res)=>{
      if(res.status == 200){
        if(res.body.users.length != 0){
          this.users = res.body.users;
        }
      }
      else{
        this.common.showErr("Something Went Wrong");
      }
    },err => {
      this.common.showErr(err.error.message);
    })
  }

  routeToChat(userId, name){
    this.router.navigate(['/dashboard/chat/'+userId+"/"+name])
  }

}
