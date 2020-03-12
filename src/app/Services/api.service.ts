import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url = 'http://localhost:3001';
  public socket;    

  constructor(private http : HttpClient) {
    this.socket = io(this.url);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('chats', (message) => {
            observer.next(message);
        });
    });
}

  // Api service for api calling

  apiService(data): Observable<any>{
    // Get API Call
    if(data.type == 'GET'){
      return this.http.get<any>(data.url, {headers: data.header, observe: 'response'}).pipe(tap(res => {
        if(res){
          if(res.body){
            return res;
          }
          return false;
        }
        return false;
      }))
    }

    // Post API Call
    else if(data.type == 'POST'){
      return this.http.post<any>(data.url, data.data, {headers: data.header, observe: 'response'}).pipe(tap(res => {
        if(res){
          if(res.body){
            return res;
          }
          return false;
        }
        return false;
      }))
    }

    // delete api call

    else if(data.type == 'DELETE'){
      return this.http.delete<any>(data.url, {headers: data.header, observe: 'response'}).pipe(tap(res => {
        if(res){
          if(res.body){
            return res;
          }
          return false;
        }
        return false;
      }))
    }

    // put api call

    else if(data.type == 'PUT'){
      return this.http.put<any>(data.url, data.data, {headers: data.header, observe: 'response'}).pipe(tap(res => {
        if(res){
          if(res.body){
            return res;
          }
          return false;
        }
        return false;
      }))
    }

     // patch api call

     else if(data.type == 'PATCH'){
      return this.http.patch<any>(data.url, data.data, {headers: data.header, observe: 'response'}).pipe(tap(res => {
        if(res){
          if(res.body){
            return res;
          }
          return false;
        }
        return false;
      }))
    }
    else{
      console.log("Something went wrong");
    }
  }

}