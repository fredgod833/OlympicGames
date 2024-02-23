import {Component, Input} from '@angular/core';
import {InfoBox} from "../../models/info-box.model";

@Component({
  selector: 'app-charts-header',
  templateUrl: './charts-header.component.html',
  styleUrls: ['./charts-header.component.scss']
})
export class ChartsHeaderComponent {

  @Input()
  title!:string

  @Input()
  infoBoxes!:InfoBox[];

  constructor() { }

}
