import {Component, Input} from '@angular/core';
import {InfoBox} from "../../models/info-box.model";


/**
 * Composant Title + info boxes
 */
@Component({
  selector: 'app-charts-header',
  templateUrl: './charts-header.component.html',
  styleUrls: ['./charts-header.component.scss']
})
export class ChartsHeaderComponent {

  @Input()
  description!:string

  @Input()
  infoBoxes!:InfoBox[];

  constructor() { }

}
