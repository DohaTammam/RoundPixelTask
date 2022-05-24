import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root'
})
export class MyApisService {

  userIp ='';
  constructor(private http : HttpClient) { }

  getCountries():Observable<any>{
     return this.http.get(
      'https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en'
    );
  }

  
  getUserIp(){
    return this.http.get('https://api.ipify.org/?format=json');
  }

  
  getGeoLocation(ipAddress: any): Observable<any> {
    return this.http.get(`https://ipapi.co/${ipAddress}/json/`);
  }
}
