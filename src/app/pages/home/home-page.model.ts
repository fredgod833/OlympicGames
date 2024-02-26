import {PieDataModel} from "../../core/models/charts/pie-data.model";
import {InfoBox} from "../../core/components/info-box/info-box.model";
import {OlympicCountryModel} from "../../core/models/olympic-country.model";

export class HomePageModel {

  constructor(public olympicCountries: OlympicCountryModel[], public infoBoxes : InfoBox[], public pieData : PieDataModel[]) {}

}
