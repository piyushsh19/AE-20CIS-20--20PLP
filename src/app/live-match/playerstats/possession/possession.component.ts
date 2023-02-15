import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-possession',
  templateUrl: './possession.component.html',
  styleUrls: ['./possession.component.scss']
})
export class PossessionComponent implements OnInit {

  constructor(private _http: HttpClient) { this.homeTeam()}
  public home: any;

  ngOnInit(): void {
  }


  homeTeam() {
    this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&season_id=2021&feed_type=F9",
    {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.home = data;
            
            console.log(this.home )
          });
      });
  }

   parseXML(data: any) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr : any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {
       
        var obj = result.SoccerFeed.SoccerDocument[0].MatchData[0].TeamData[0].PlayerLineUp[0];  
   

        for (k in obj.MatchPlayer) {  
          var homes = obj.MatchPlayer[k];
          console.log(homes.Stat[0]) 
   
        arr.push({
          val:homes
        })
         
          
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  
}
