export class LineDataModel {
  constructor(public name: string, public series: ChartlinePoint[]) {}
}

export class ChartlinePoint {
  constructor(public name:string, public value:number){}
}




