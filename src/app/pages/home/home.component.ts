import { Component, OnInit } from '@angular/core';
import {map, Observable, of, reduce, take, takeLast} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {PieDataModel} from "../../core/models/charts/pie-data.model";
import {OlympicCountryModel} from "../../core/models/olympic-country.model";
import {ParticipationModel} from "../../core/models/participation.model";
import {tap} from "rxjs/operators";
import {InfoBox} from "../../core/components/info-box/info-box.model";
import {HomePageModel} from "./home-page.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  model$! : Observable<HomePageModel>;

  view!: [number, number];

  colorScheme: Color = {
    domain: [ '#3BFA6A', '#FA4039',
      '#3BEBFA', '#1E1E1E', '#364DFA'],
    name: "custom",
    selectable: false,
    group: ScaleType.Linear
  };

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // met à jour la taille disponible pour le camembert
    this.adjustGraphView();

    // créé l'observable pour l'obtention des données
    this.model$ = this.olympicService.getOlympics().pipe(
      tap((olympics : OlympicCountryModel[]) => console.log(olympics)),
      map((olympics : OlympicCountryModel[]) => new HomePageModel(this.olympics2InfoBoxes(olympics), this.olympics2Pie(olympics)))
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
        value.id,
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

  private olympicsCountryByName(olympicCountries: OlympicCountryModel[] , name: string) : OlympicCountryModel {
    let filtered : OlympicCountryModel[] = olympicCountries.filter((value:OlympicCountryModel) => value.country === name);
    if (filtered.length == 1) {
      return filtered[0];
    }
    throw new Error(`data not found for ${name}`);
  }

  onSliceClick(event: Event) {
    {
      /*
    let olympicCountries: OlympicCountry[];
    this.olympicService.getOlympics().pipe(
      take(1),
      //tap((value:OlympicCountry[]) => { console.log(this.olympicsCountryByName(value, event.name))}),
    ).subscribe(); */
    }


  }

  onResize(event: Event) {
    this.adjustGraphView();
  }

  adjustGraphView() {
    let height = this.contentHeight();
    // on ajuste la taille disponible pour le graphique
    // on doit réduire drastiquement la largeur car les noms
    // des tranches débordent du cadre fixé par view
    let width : number = window.innerWidth * 0.50;
    height = height * 0.8;
    let maxheight: number = width *.8;
    if (height > maxheight) {
      height = maxheight;
    }
    this.view = [width, height];
  }

  private contentHeight() {
    // hauteur disponible
    let height: number = window.innerHeight;
    // on retire la hauteur du div header
    let div1 = document.getElementsByClassName('pageHeader');
    if (div1 && div1.length == 1) {
      height -= div1[0].clientHeight;
    }
    // on retire la hauteur du div contenant les info-box
    let div2 = document.getElementsByClassName('infobar');
    if (div2 && div2.length == 1) {
      height -= div2[0].clientHeight;
    }
    return height;
  }
}
