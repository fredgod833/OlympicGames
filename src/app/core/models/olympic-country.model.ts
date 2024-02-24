import {ParticipationModel} from "./participation.model";

export class OlympicCountryModel {
  id!: number;
  country!: string;
  participations!: ParticipationModel[];
}

