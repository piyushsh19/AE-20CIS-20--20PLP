import { Component,  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-scoreheader',
  templateUrl: './scoreheader.component.html',
  styleUrls: ['./scoreheader.component.scss']
})
export class ScoreheaderComponent  {
  public gameId: any;
  public xmlItems: any;

  constructor(private _http: HttpClient,  private route : ActivatedRoute) { this.loadXML() }

  getGameId() {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.gameId = params['id'].slice(1)   
      }
    )
  }
  matchId = this.getGameId();

  loadXML() {
    this._http.get(`https://omo.akamai.opta.net/?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&game_id=${this.gameId}&feed_type=F9`,
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
            this.xmlItems = data;
            console.log(this.xmlItems)
            
          });
      });
  }
   parseXML(data: any) {  
    return new Promise(resolve => {  
      var t: string | number,  
        arr : any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {
       
        var obj = result.SoccerFeed; 
   console.log(obj)

      
          var homeTeam = obj.SoccerDocument[0].Team[0].Name[0]
          console.log(homeTeam)
          var homescore = obj.SoccerDocument[0].MatchData[0].TeamData[0].$.Score
          var awayscore = obj.SoccerDocument[0].MatchData[0].TeamData[1].$.Score
          var awayTeam = obj.SoccerDocument[0].Team[1].Name[0]
          
          // var team1 = obj.SoccerDocument[0].Team[0].Player[k]; 
          arr.push({  
            
            homeName: homeTeam,
            awayName: awayTeam,
            homescore: homescore,
            awayscore:awayscore

          });  
        
        resolve(arr);  
      });  
      
    });  
  }  
}