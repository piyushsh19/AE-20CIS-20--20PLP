import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {
  public xmlItems: any;
  public xmlItems2: any;
  public gameId: number | any;
 
  constructor(private _http: HttpClient,  private route : ActivatedRoute) { this.loadXML(),this.team2() }
  
  ngOnInit(){
    
  }

  getGameId() {
    // this.gameId = this.route.snapshot.data["gameID"]
    // console.log(this.gameId)
    this.route.params.subscribe(
      (params: Params) => {
        this.gameId = params['id'].slice(1)
        console.log(this.gameId)
     
      }
    )
  }
  matchId = this.getGameId();
  displayedColumns: string[] = ['number', 'name'];

 
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

        for (k in obj.SoccerDocument[0].Team[0].Player) {  
          var teamName= obj.SoccerDocument[0].Team[0].$.uID
            console.log(teamName)
            var team1 = obj.SoccerDocument[0].Team[0].Player[k]; 
            function getTeamName(teamID:string) {
              for (t in obj.SoccerDocument[0].Team) {
                var team = obj.SoccerDocument[0].Team[t]
                if (team.$.uID == teamID) {
                  return team.Name[0]
                }
              }
              return "no team found";
            }
            // function getNumber(playerId:string) {
            //   for (t in obj.SoccerDocument[0].Team[0].Player) {
            //     var player = obj.SoccerDocument[0].Player[t]
            //     if (player.$.uID == playerId) {
            //       return player.Name[0]
            //     }
            //   }
            //   return "noshirt found";
            // }
          arr.push({  

         nameHome: team1.PersonName[0].First,
         teamName: getTeamName(teamName),
         nameAway:team1.PersonName[0].Last,
         positionHome:team1.$.Position,
        //  nameAway : team2.PersonName[0].First, 
             
       
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  

  team2() {
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
        this.parseXML2(data)
          .then((data) => {
            this.xmlItems2 = data;
            
            // console.log(this.xmlItems )
          });
      });
  }
   parseXML2(data: any) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr : any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {
       
        var obj = result.SoccerFeed;  
   

        for (k in obj.SoccerDocument[0].Team[1].Player) {  
          var team2 = obj.SoccerDocument[0].Team[1].Player[k]; 


          arr.push({  

         nameHome: team2.PersonName[0].First,
         nameAway:team2.PersonName[0].Last,
         posititonHome: team2.$.Position,
         positionAway:team2.$.Position,
        //  nameAway : team2.PersonName[0].First, 
             
       
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  } 