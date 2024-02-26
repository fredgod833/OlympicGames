import {InfoBox} from "../../core/components/info-box/info-box.model";
import {LinesDataModel} from "../../core/models/charts/lines-data.model";

export class CountryPageModel {
  constructor(
    public name:string,
    public infoBoxes : InfoBox[],
    public datas : LinesDataModel
  ) {}
}
