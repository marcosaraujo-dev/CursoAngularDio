import { Filme } from './../../shared/models/filme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from '../../core/filmes.service';

@Component({
  selector: 'mas-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  filme: Filme;
  readonly semFoto = './../../../assets/images/no-image.svg';

  constructor(private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService
    ) { }

  ngOnInit() {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number): void {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);

   // alert(this.filme);
  }

}
