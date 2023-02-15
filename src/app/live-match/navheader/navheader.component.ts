import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.scss']
})
export class NavheaderComponent implements OnInit {

  public gameId: number | any;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.gameId = params['id']
  })
  }
}
