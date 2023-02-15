import { Component, OnInit } from '@angular/core';
// import { OptaDataService } from '../services/opta-data.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {

  public xmlItems: any;


  constructor(private _http: HttpClient) { this.loadXML(); }
  ngOnInit(): void {
  }
  displayedColumns: string[] = ['Kick-Off', 'Matches', 'Venue',"Link"];

  loadXML() {
    this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&season_id=2021&feed_type=F1",
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
            
            console.log(this.xmlItems )
          });
      });
  }
   parseXML(data: any) {  
    return new Promise(resolve => {  
      var k: string | number
      var t:any,  
        arr : any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {
       
        var obj = result.SoccerFeed;  
        
        function getTeamName(teamID:string) {
          for (t in obj.SoccerDocument[0].Team) {
            var team = obj.SoccerDocument[0].Team[t]
            console.log(team)
            if (team.$.uID == teamID) {
              return team.Name[0]
            }
          }
          return "no team found";
        }
        

        for (k in obj.SoccerDocument[0].MatchData) {  
          var items = obj.SoccerDocument[0].MatchData[k] ; 
         console.log(items.$.uID)
        
          arr.push({  
             
            // TeamName : item.Name[0]   ,
            // uID :item.$.uID,
            MatchDataTime: items.MatchInfo[0].TZ ,
            MatchDataDate: items.MatchInfo[0].Date,
            MatchHome : getTeamName(items.TeamData[0].$.TeamRef),
            MatchAway : getTeamName(items.TeamData[1].$.TeamRef),
            ScoreHome: items.TeamData[0].$.Score,
            ScoreAway: items.TeamData[1].$.Score,
            ids: items.$.uID,



            Venue: items.Stat[0]._,
      
            City : items.Stat[1]._,
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  } 