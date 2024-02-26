
export class ChartPoint {
  constructor(public name: string, public value: number){}
}

export class ChartLine {

  public series: ChartPoint[] = [];
  public yMin: number = Number.POSITIVE_INFINITY;
  public yMax: number = Number.NEGATIVE_INFINITY;

  constructor(public name: string){}

  public addPoint(name:string, value:number) : void {
    this.series[this.series.length] = new ChartPoint(name, value);
    this.yMin = (this.yMin > value) ? value : this.yMin;
    this.yMax = (this.yMax < value) ? value : this.yMax;
  }
}

export class LinesDataModel {

  public lines: ChartLine[] = [];
  public yMin: number = Number.POSITIVE_INFINITY;
  public yMax: number = Number.NEGATIVE_INFINITY;

  constructor(public name: string) {}

  public addLine(line: ChartLine) {
    this.lines[this.lines.length] = line;
    this.yMin = (this.yMin > line.yMin) ? line.yMin : this.yMin;
    this.yMax = (this.yMax < line.yMax) ? line.yMax : this.yMax;
  }
}





