import { Component, OnInit } from '@angular/core';
import {map, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {PieDataModel} from "../../core/models/charts/pie-data.model";
import {OlympicCountryModel} from "../../core/models/olympic-country.model";
import {ParticipationModel} from "../../core/models/participation.model";
import {tap} from "rxjs/operators";
import {InfoBox} from "../../core/models/info-box.model";
import {Router} from "@angular/router";
import {LayoutService} from "../../core/services/layout.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  model$! : Observable<PieDataModel[]>;

  view!: [number, number];

  infoBoxes: InfoBox[] = [];

  colorScheme: Color = {
    domain: [],
    name: "custom",
    selectable: false,
    group: ScaleType.Linear
  };

  constructor(private olympicService: OlympicService, private layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    // met à jour la taille disponible pour le camembert
    this.adjustGraphView();

    // créé l'observable pour l'obtention des données
    this.model$ = this.olympicService.getOlympics().pipe(
      tap((olympics : OlympicCountryModel[]) => {
        this.layoutService.updateColorScheme(olympics, this.colorScheme)
        this.infoBoxes = this.olympics2InfoBoxes(olympics);
      }),
      map((olympics : OlympicCountryModel[]) => this.olympics2Pie(olympics))
    );
  }

  /**
   * Converti les données délivrées par olympicService en data pour le graph
   * @param olympicCountries : données du service (OlympicCountry[])
   * @return les données mappées PieDataModel[]
   */
  private olympics2Pie(olympicCountries: OlympicCountryModel[] ) : PieDataModel[] {
    let result : PieDataModel[] = [];
    olympicCountries.forEach( (value:OlympicCountryModel, idx: number):void => {
      result[idx] = new PieDataModel(
        value.country,
        value.participations
          .map((value: ParticipationModel) => value.medalsCount)
          .reduce((a:number, b:number) => a+b));
    });
    return result;
  }

  /**
   * Converti les données délivrées par olympicService en donnés pour les infoBoxes
   * @param olympicCountries : données du service (OlympicCountry[])
   * @return les données mappées InfoBox[]
   */
  private olympics2InfoBoxes(olympicCountries: OlympicCountryModel[] ) : InfoBox[] {
    let result : InfoBox[] = [];
    let years : Array<number> = [];
    olympicCountries.forEach( (value:OlympicCountryModel, idx: number):void => {
      value.participations.forEach( (participation: ParticipationModel) => {
          if (!years.includes(participation.year)) {
            years[years.length] = participation.year;
          }
        }
      )
    });
    result[0] = new InfoBox("Number of JOs", years.length);
    result[1] = new InfoBox("Number of countries", olympicCountries.length);
    return result;
  }

  onSliceClick(event: any) {
    this.router.navigateByUrl(`country/${event.name}`);
  }

  onResize(event: Event) {
    this.adjustGraphView();
  }

  adjustGraphView() {
    let height: number = this.layoutService.getContentHeight();
    // on ajuste la taille disponible pour le graphique
    // on doit réduire drastiquement la largeur car les noms
    // des tranches débordent du cadre fixé par view
    let width: number = window.innerWidth * 0.50;
    height = height * 0.8;
    let maxheight: number = width *.8;
    if (height > maxheight) {
      height = maxheight;
    }
    this.view = [width, height];
  }

}
