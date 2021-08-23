import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ConfigParams } from './../../shared/models/config-params';
import { Genero } from './../../domain/genero';
import { DataserviceService } from './../../dataservice.service';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';

@Component({
  selector: 'mas-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss'],
  providers: [DataserviceService]
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = './../../../assets/images/no-image.svg';
  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generoFilme: Genero[];

  constructor(private filmesService: FilmesService,
    private fb: FormBuilder,
    private dataService: DataserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });
    this.generoFilme = this.dataService.getGeneros();
    this.listarFilmes();


    this.filtrosListagem.get('texto').valueChanges
      .pipe(debounceTime(600))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.limparConsulta();
      });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {

      this.config.campo = { tipo: 'genero', valor: val };
      this.limparConsulta();
    });
  }



  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void {
  //  alert('');
     this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((f: Filme[]) => this.filmes.push(...f));

  }

  private listarTodosFIlmes(): void {
    // this.filmesService.listar().subscribe((f:Filme[]) => this.filmes = f);
  }

  private limparConsulta() {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
