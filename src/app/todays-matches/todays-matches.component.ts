import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-todays-matches',
  templateUrl: './todays-matches.component.html',
  styleUrls: ['./todays-matches.component.scss']
})
export class TodaysMatchesComponent implements OnInit {
applyFilter() {
  console.log(this.StartDate)
 return this.StartDate
}

  rangeFormGroup = new FormGroup({  
    start: new FormControl(new Date("2022-08-06"), Validators.required),  
    end: new FormControl(new Date("2022-08-07"), Validators.required)  
  }) 
public xmlItems: any;
public Today = new Date();
// date = new FormControl(new Date())
addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  console.log(event.value)
}


constructor(private _http: HttpClient) { }
ngOnInit(): void {
  this.loadXML(); 
}
displayedColumns: string[] = ['Kick-Off', 'Matches', 'Status', 'Links'];


get StartDate(){
  console.log(this.rangeFormGroup.value.start)
  return this.rangeFormGroup.value.start
}
get End(){
  return this.rangeFormGroup.value.end
}
loadXML() {
  this._http.get("https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&season_id=2022&feed_type=F1",
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
    minDATE = this.applyFilter(),
  
      arr : any = [],  
      parser = new xml2js.Parser(  
        {  
          trim: true,  
          explicitArray: true  
        });  
    parser.parseString(data, function (err, result) {
     
      var obj = result.SoccerFeed;  

console.log(minDATE)
      for (k in obj.SoccerDocument[0].MatchData) {  
        var items = obj.SoccerDocument[0].MatchData[k] ;
        function getTeamName(teamID:string) {
          for (t in obj.SoccerDocument[0].Team) {
            var team = obj.SoccerDocument[0].Team[t]
            if (team.$.uID == teamID) {
              return team.Name[0]
            }
          }
          return "no team found";
        }
        
                
      
        if ((new Date(items.MatchInfo[0].Date)).toDateString() == (new Date(`${minDATE}`)).toDateString() ) {
        // if (((new Date(items.MatchInfo[0].Date)).toDateString() <= (new Date('2022-08-06')).toDateString()) && ((new Date(items.MatchInfo[0].Date)).toDateString() >= (new Date('2022-10-10')).toDateString()) ) {
          arr.push({  
           
            // TeamName : item.Name[0]   ,
            // uID :item.$.uID,
            MatchDataStatus: items.MatchInfo[0].$.Period ,
            MatchDataDate: new Date(items.MatchInfo[0].Date),
            MatchDataTimeZone: (items.MatchInfo[0].TZ),
            MatchHome : getTeamName(items.TeamData[0].$.TeamRef),
            MatchAway : getTeamName(items.TeamData[1].$.TeamRef),
            symbol: "--->",
            ids: items.$.uID,
          });  
        }
      }  
      resolve(arr);  
    });  
    
  });  
}  

// filterChange(event:Event){
  
//   const filval =(event.target as HTMLInputElement).value;
//   this.xmlItems.filter = filval;
//   console.log(filval)
// }
} 
