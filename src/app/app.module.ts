import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table' ;
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VidiprinterComponent } from './vidiprinter/vidiprinter.component';
import { MultiLeagueComponent } from './multi-league/multi-league.component';
import { ClassifiedTablesComponent } from './classified-tables/classified-tables.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { FixtureComponent } from './fixture/fixture.component';
import { TodaysMatchesComponent } from './todays-matches/todays-matches.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { TeamstatsComponent } from './live-match/teamstats/teamstats.component';
import { MatchstatsComponent } from './live-match/matchstats/matchstats.component';
import { PlayerstatsComponent } from './live-match/playerstats/playerstats.component';
import { NavheaderComponent } from './live-match/navheader/navheader.component';
import { FormsModule } from '@angular/forms';
import { ScoreheaderComponent } from './live-match/scoreheader/scoreheader.component';
import { ChancesComponent } from './live-match/playerstats/chances/chances.component';
import { PossessionComponent } from './live-match/playerstats/possession/possession.component';
import { SubcardsComponent } from './live-match/playerstats/subcards/subcards.component';
import { SubCardService } from './services/subcard.service';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    VidiprinterComponent,
    MultiLeagueComponent,
    ClassifiedTablesComponent,
    LiveMatchComponent,
    FixtureComponent,
    TodaysMatchesComponent,
    SidebarComponent,
    BodyComponent,
    FooterComponent,
    TeamstatsComponent,
    MatchstatsComponent,
    PlayerstatsComponent,
    NavheaderComponent,
    ScoreheaderComponent,
    ChancesComponent,
    PossessionComponent,
    SubcardsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [SubCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
