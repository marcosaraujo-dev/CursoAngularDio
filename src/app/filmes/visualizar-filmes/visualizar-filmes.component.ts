import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from '../../core/filmes.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'mas-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  filme: Filme;
  id: number;
  readonly semFoto = './../../../assets/images/no-image.svg';

  constructor(
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService,
              private router: Router
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private excluir(): void {
    const config = {

      data: {
        titulo: 'Você tem certeza que deseja excluir o filme? ',
        descricao: 'Clique no botão OK para confirmar a exclusão',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }
  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }
}
