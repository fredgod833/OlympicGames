import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Subject, take} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {OlympicCountryModel} from "../models/olympic-country.model";

@Injectable({
  providedIn: 'root',
})

/**
 * Service fournissant les données des précédents résultats Olympiques par Pays.
 */
export class OlympicService {

  //url du service fournissant les données (ici mocké dans fichier json resource)
  private olympicUrl = './assets/mock/olympic.json';

  //Subject permettant la mise en cache du résultat d'appel du service.
  private olympics$: Subject<OlympicCountryModel[]> = new BehaviorSubject<OlympicCountryModel[]>([]);

  /**
   * Constructor
   * @param http client http
   */
  public constructor(private http: HttpClient) {}

  /**
   * Appel et met en cache le résultat du service dans le BehaviorSubject
   */
  public loadInitialData() {
    return this.http.get<OlympicCountryModel[]>(this.olympicUrl).pipe (
      tap((value : OlympicCountryModel[]) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        // tableau vide car pas de données disponibles
        this.olympics$.next([]);
        // can be useful to end loading state and let the user know something went wrong
        return caught;
      })
    );
  }

  /**
   * Retourne l'observable permettant de délivrer le résultat de service.
   */
  public getOlympics() {
    return this.olympics$.asObservable();
  }

}
