import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class SubCardService {

    endpointUrl = `${environment.apiEndpoint}competition.php`
    // https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&feed_type=F9&season_id=2021

    constructor(private http: HttpClient){}

    getData(username: string,password: string, competitionId: number, seasonId: number,type:number) {
        return this.http.get<any>(`${this.endpointUrl}/?user=${username}&psw=${password}&competition=${competitionId}&season_id=${seasonId}&feed_type=${type}`)
    }
}