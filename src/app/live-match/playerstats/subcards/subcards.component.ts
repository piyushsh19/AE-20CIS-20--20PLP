import { Component, OnInit } from '@angular/core';
import { SubCardService } from 'src/app/services/subcard.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Pogba ', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Ronaldo', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Messi ', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Sergio Ramos', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Hummels', weight: 10.811, symbol: 'B'},

];
@Component({
  selector: 'app-subcards',
  templateUrl: './subcards.component.html',
  styleUrls: ['./subcards.component.scss']
})
export class SubcardsComponent implements OnInit {

  constructor( serviceCard:SubCardService) {
    console.log(serviceCard.getData("AEL_BBCSport","nm6YM5BDTE1PmPs",8,2021,9))
   }

  ngOnInit(): void {
  }
    displayedColumns: string[] = ['position', 'name'];
    dataSource = ELEMENT_DATA;
  
}

