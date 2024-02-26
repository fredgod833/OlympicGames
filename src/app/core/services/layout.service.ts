import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
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
}


