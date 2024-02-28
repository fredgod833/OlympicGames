import {ParticipationModel} from "./participation.model";

/**
 * Data provided by Olympic Service
 * Contains list of participations for a country
 */
export class OlympicCountryModel {
  id!: number;
  country!: string;
  participations!: ParticipationModel[];
}

