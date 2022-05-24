import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  shareUserName:any=localStorage.getItem('userName') ;
  shareIpAddress:any=localStorage.getItem('ipAddress') ;
  constructor() { }
}
