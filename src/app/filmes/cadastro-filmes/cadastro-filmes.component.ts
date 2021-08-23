import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from './../../shared/models/filme';
import { Alerta } from './../../shared/models/alerta';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { FilmesService } from './../../core/filmes.service';
import { Genero } from './../../domain/genero';
import { DataserviceService } from './../../dataservice.service';


@Component({
  selector: 'mas-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
  providers: [DataserviceService]
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastroFilme: FormGroup;
  generoFilme: Genero[];
  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private dataService: DataserviceService,
    private router: Router) { }

  get f() {
    return this.cadastroFilme.controls;
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id).subscribe((f: Filme) => this.criarFormulario(f));

    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }


  }


  submit(): void {
    this.cadastroFilme.markAllAsTouched();
    if (this.cadastroFilme.invalid) {
      return;
    }
    const filme = this.cadastroFilme.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
    // alert('cadastro realized com sucesso!\n\n' + JSON.stringify(this.cadastroFilme.value,null,4));
  }
  reiniciarForm(): void {
    this.cadastroFilme.reset();
  }
  private criarFormulario(filme: Filme): void {
    this.cadastroFilme = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dataLancamento: [filme.dataLancamento, [Validators.required]],
      descricao: [filme.descricao],
      notaIMDb: [filme.notaIMDb, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
    this.generoFilme = this.dataService.getGeneros();
  }

  private criarFilmeEmBranco(): Filme {
    return {
      titulo: null,
      dataLancamento: null,
      urlFoto: null,
      descricao: null,
      notaIMDb: null,
      urlIMDb: null,
      genero: null,
      id: null
    };
  }
  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(
      () => {
        const config = {

          data: {
            btnSucesso: 'Ir para listagem',
            btnCancelar: 'Cadastrar novo Filme',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);

        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao gravar o registro!',
            descricao: 'Tente novamente.',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(
      () => {
        const config = {
          data: {
            descricao: 'Seu registro foi atualizado com sucesso',
            btnSucesso: 'Ir para listagem'
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);

        dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
      },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao alterar o registro!',
            descricao: 'Tente novamente.',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
