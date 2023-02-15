import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-matchstats',
  templateUrl: './matchstats.component.html',
  styleUrls: ['./matchstats.component.scss']
})
export class MatchstatsComponent implements OnInit {
  public home: any;
  public away: any;

   public gameId: { id: string } | any

  constructor(private _http: HttpClient, private route : ActivatedRoute) { this.homeTeam(),this.awayTeam() }
  ngOnInit() {
  
     this.route.params.subscribe(
      (params: Params) => {
        this.gameId = params['id'].slice(1)
     
      }
    )
  }
  getGameId() {
    // this.gameId = this.route.snapshot.data["gameID"]
    // console.log(this.gameId)
    this.route.params.subscribe(
      (params: Params) => {
        this.gameId = params['id'].slice(1)     
      }
    )
  }
  matchId = this.getGameId();
  
  displayedColumns: string[] = ['number'];

  homeTeam() {
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
            this.home = data;

            console.log(this.home)
            
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
       
        var obj = result.SoccerFeed

        function getStats(teamID:string) {
            for (k in obj.SoccerDocument[0].MatchData[0].TeamData[0].Stat) {
              var team = obj.SoccerDocument[0].MatchData[0].TeamData[0].Stat[k]
              // console.log(team._)

              if (team.$.Type === teamID ) {
                return team._
              }
            }
            return "no team found";
          }
          
          arr.push({  
          // val1: homes[0].Stat,
          // foul: homes.$.Type[	"att_miss_left"]
          possession: getStats("possession_percentage"),
          corner: getStats("corner_taken"),
          shot: getStats("shot_off_target"),
          passes: getStats("successful_final_third_passes"),
          finalThirdEnteries: getStats("final_third_entries")
           
          });  
         
        resolve(arr);  
      });  
      
    });  
  }  
  
  awayTeam() {
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
            this.away = data;
            
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
        
   

        for (k in obj.SoccerDocument[0].MatchData[0].TeamData[1].Stat) {  
          var away = obj.SoccerDocument[0].MatchData[0].TeamData[1].Stat[k]; 


          arr.push({  

 
       
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  } 