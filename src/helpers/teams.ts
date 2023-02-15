import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';

export class teams {
  public xmlItems: any;
  public xmlItems2: any;


  constructor(private _http: HttpClient) { this.loadXML(),this.team2() }
  ngOnInit(): void {
  }
  displayedColumns: string[] = ['number', 'name'];

  loadXML() {
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
            this.xmlItems = data;
            
            // console.log(this.xmlItems )
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
   

        for (k in obj.SoccerDocument[0].Team[0].Player) {  
          var team1 = obj.SoccerDocument[0].Team[0].Player[k]; 
          console.log(team1)
          arr.push({  
       
           
          });  
        }  
        resolve(arr);  
      });  
      
    });  
  }  
  
  team2() {
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

          console.log(team2)

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