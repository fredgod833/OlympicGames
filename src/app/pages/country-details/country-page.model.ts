import {InfoBox} from "../../core/components/info-box/info-box.model";
import {PieDataModel} from "../../core/models/charts/pie-data.model";
import {LineDataModel} from "../../core/models/charts/line-data.model";

export class CountryPageModel {

  constructor(public infoBoxes : InfoBox[], public datas : LineDataModel[]) {}

}
