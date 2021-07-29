import { Injectable } from '@angular/core';
import { Genero } from './domain/genero';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  getGeneros() {
    return [
     new Genero('Ação', 'Ação' ),
     new Genero('Aventura', 'Aventura' ),
     new Genero('Ficção Científica', 'Ficção Científica' ),
     new Genero('Romance','Romance'),
     new Genero('Terror','Terror'),
     new Genero('Comédia','Comédia'),
     new Genero('Drama','Drama')
    ];
  }
  constructor() { }
}
