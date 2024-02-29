import {Component, Input, OnInit} from '@angular/core';

/**
 * Info Box Component presents one value and it's description
 */
@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  @Input()
  description!: string;

  @Input()
  value!: number

  constructor() { }

  ngOnInit(): void {
  }


}
