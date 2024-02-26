import {Injectable} from "@angular/core";
import {OlympicCountryModel} from "../models/olympic-country.model";
import {Color} from "@swimlane/ngx-charts";

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private colorMap : Map<string,string> = new Map<string, string>([
    ["ITALY", "#3BFA6A"],
    ["SPAIN", "#FA4039"],
    ["UNITED STATES", "#3BEBFA"],
    ["GERMANY", "#2E2E2E"],
    ["FRANCE", "#364DFA"]
  ]);

  /**
   * Retourne la hauteur disponible sous title + infoboxes.
   */
  public getContentHeight() : number {
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

  /**
   * Retourne la couleur RGB pour la représentation d'un pays
   * @param countryName: nom du pays
   */
  public getCountryColor(countryName:string): string {
    let sanitized_name: string = countryName.toUpperCase().trim();
    let result : string | undefined = this.colorMap.get(sanitized_name)
    if (result === undefined) {
      result = '#'+(Math.floor(Math.random()*0xFFFFFF)).toString(16);
      this.colorMap.set(sanitized_name,result);
    }
    return result;
  }

  /**
   * Met à jour la liste des couleurs pour la liste des pays
   * @param olympicCountries : données du service (OlympicCountry[])
   * @param colorScheme: palette de couleurs à utiliser
   */
  public updateColorScheme(olympicCountries: OlympicCountryModel[], colorScheme:Color) : void {
    let colors: string[] = [];
    olympicCountries.forEach( (value:OlympicCountryModel, idx: number):void => {
      colors[idx] = this.getCountryColor(value.country);
    });
    colorScheme.domain=colors;
  }

}


