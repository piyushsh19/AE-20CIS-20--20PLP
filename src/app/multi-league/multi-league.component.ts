import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';


@Component({
  selector: 'app-multi-league',
  templateUrl: './multi-league.component.html',
  styleUrls: ['./multi-league.component.scss']
})
export class MultiLeagueComponent implements OnInit {

  public xmlItems: any;
  public xmlItemss: any;
  public xmlItems2: any;
  public competitionName:any;

  displayedColumns: string[] = ['Rank', 'Team','Played', 'GD', 'PTS'];
competition: any;


  constructor(private _http: HttpClient) { this.loadXML(), this.loadXMLL(); this.loadXML2(); }
  loadXML2() {
    {
      this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=12&season_id=2021&feed_type=F3",
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
              this.xmlItems2 = data;
              console.log(this.xmlItemss)
            });
        });
    }
  }
  loadXMLL()  {
    this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&season_id=2021&feed_type=F3",
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
            this.xmlItemss = data;
            console.log(this.xmlItemss)
          });
      });
  }
  ngOnInit(): void {
  }
  
  loadXML() {
    this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=11&season_id=2021&feed_type=F3",
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
      var k: string | number,  
        arr : any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {  
        var obj = result.SoccerFeed;  
        for (k in obj.SoccerDocument[0].Competition[0].TeamStandings[0].TeamRecord && obj.SoccerDocument[0].Team ) {  
          var item = obj.SoccerDocument[0].Competition[0].TeamStandings[0].TeamRecord[k] ;
          var items = obj.SoccerDocument[0].Team[k] ;  
          var competitionName = obj.SoccerDocument[0]
     console.log(competitionName.$.competition_name)
          arr.push({  
            competition: competitionName.$.competition_name,
            id: item.Standing[0].AwayPosition,  
            namesteams: items.Name,
            homeposition:item.Standing[0].HomePosition,
            position: item.Standing[0].Position,
            lost:item.Standing[0].Lost,
            won: item.Standing[0].Won,
            Played: item.Standing[0].Played,
            Drawn: item.Standing[0].Drawn,
            For: item.Standing[0].For,
            Against: item.Standing[0].Against,
            Points: item.Standing[0].Points
  
            
            
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  } 
