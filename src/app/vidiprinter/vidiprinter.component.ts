import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vidiprinter',
  templateUrl: './vidiprinter.component.html',
  styleUrls: ['./vidiprinter.component.scss']
})
export class VidiprinterComponent implements OnInit {
constructor(private http: HttpClient){}
ngOnInit(): void {
 this.loadXML() 
}

loadXML(){
  this.http.get('https://omo.akamai.opta.net/competition.php?user=AEL_BBCSport&psw=nm6YM5BDTE1PmPs&competition=8&season_id=2022&feed_type=F1&json' ).subscribe(
    data => {
      console.log(data)
    }
  )
}
}
