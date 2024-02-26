import {booleanAttribute, Component, OnInit} from '@angular/core';
import {filter, map, Observable, takeLast} from "rxjs";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {tap} from "rxjs/operators";
import {OlympicCountryModel} from "../../core/models/olympic-country.model";
import {InfoBox} from "../../core/components/info-box/info-box.model";
import {ActivatedRoute} from "@angular/router";
import {ChartLine, LinesDataModel} from "../../core/models/charts/lines-data.model";
import {ParticipationModel} from "../../core/models/participation.model";
import {LayoutService} from "../../core/services/layout.service";

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  model$! : Observable<LinesDataModel>;

  view!: [number, number];

  countryName!: string;

  infoBoxes: InfoBox[]=[];

  colorScheme: Color = {
    domain: [],
    name: "custom",
    selectable: false,
    group: ScaleType.Linear
  };

  constructor(private olympicService: OlympicService, private layoutService: LayoutService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // met à jour la taille disponible pour le graph
    this.adjustGraphView();
    this.countryName = this.route.snapshot.params['id'];
    // créé l'observable pour l'obtention des données
    this.model$ = this.olympicService.getOlympics().pipe (
      map((olympics : OlympicCountryModel[]) => {return olympics.filter(value => value.country === this.countryName)}),
      filter((olympics : OlympicCountryModel[]) => olympics.length==1),
      tap((olympics : OlympicCountryModel[]) => {
        this.layoutService.updateColorScheme(olympics, this.colorScheme)
        this.infoBoxes = this.olympics2InfoBoxes(olympics[0]);
      }),
      map((olympics : OlympicCountryModel[]) => {
        let result : LinesDataModel = new LinesDataModel(this.countryName);
        this.appendGraphDatas(result, olympics[0]);
        return result;
      })
    );
  }

  /**
   * Converti les données délivrées par olympicService en donnés pour les infoBoxes
   * @param olympicCountries : données du service (OlympicCountry[])
   * @return les données mappées InfoBox[]
   */
  private olympics2InfoBoxes(olympicCountry: OlympicCountryModel) : InfoBox[] {
    let result : InfoBox[] = [];
    let years : Array<number> = [];
    let medalsCount:number = 0
    let athletesCount:number = 0
    if (olympicCountry !== undefined) {
      olympicCountry.participations.forEach(participation  => {
        medalsCount += participation.medalsCount;
        athletesCount += participation.athleteCount;
        if (!years.includes(participation.year)) {
          years[years.length] = participation.year;
        }
      });
    }
    result[0] = new InfoBox("Number of entries", years.length);
    result[1] = new InfoBox("Total number medals", medalsCount);
    result[2] = new InfoBox("Total number of athletes", athletesCount);
    return result;
  }


  private appendGraphDatas(graphDatas : LinesDataModel, olympicCountry: OlympicCountryModel) : LinesDataModel {
    let chartLine : ChartLine = new ChartLine(olympicCountry.country);
    olympicCountry.participations.forEach((value:ParticipationModel, idx:number) => {
      chartLine.addPoint(value.year+"", value.medalsCount);
    });
    graphDatas.addLine(chartLine);
    return graphDatas
  }

  onResize(event: Event) {
    this.adjustGraphView();
  }

  private adjustGraphView() {
    let height: number = this.layoutService.getContentHeight();
    let width : number = window.innerWidth * 0.8;
    let heightMax: number = width*0.8;
    height *= 0.7;
    if (height > heightMax) {
      height = heightMax;
    }
    this.view = [width, height];
  }

  protected readonly booleanAttribute = booleanAttribute;
}
