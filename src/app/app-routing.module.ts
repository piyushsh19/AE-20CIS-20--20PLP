import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedTablesComponent } from './classified-tables/classified-tables.component';
import { FixtureComponent } from './fixture/fixture.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { MatchstatsComponent } from './live-match/matchstats/matchstats.component';
import { ChancesComponent } from './live-match/playerstats/chances/chances.component';
import { PlayerstatsComponent } from './live-match/playerstats/playerstats.component';
import { PossessionComponent } from './live-match/playerstats/possession/possession.component';
import { TeamstatsComponent } from './live-match/teamstats/teamstats.component';
import { MultiLeagueComponent } from './multi-league/multi-league.component';
import { TodaysMatchesComponent } from './todays-matches/todays-matches.component';
import { VidiprinterComponent } from './vidiprinter/vidiprinter.component';

const routes: Routes = [
  {path: '', redirectTo: 'todaysmatch', pathMatch: 'full'},
  {path: 'todaysmatch', component: TodaysMatchesComponent},
  {path: 'fixture&results', component: FixtureComponent},
  {path: 'classifiedtables', component: ClassifiedTablesComponent},
  {path: 'multileague', component: MultiLeagueComponent},
  {path: 'livematch/:id', component: LiveMatchComponent},
  {path: 'vidiprinter', component: VidiprinterComponent},
  {path: 'matchstats/:id', component: MatchstatsComponent},
  {path: 'teamstats/:id', component: TeamstatsComponent},
  {path: 'playerstats/:id', component: PlayerstatsComponent},
  {path: 'playerstats/chances', component: ChancesComponent},
  {path: 'playerstats/possession', component: PossessionComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
