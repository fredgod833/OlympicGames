import {ParticipationModel} from "./participation.model";

export class OlympicCountry {
  id!: number;
  country!: string;
  participations!: ParticipationModel[];
}

