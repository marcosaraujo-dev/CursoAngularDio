import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
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

  cadastroFilme: FormGroup;
  generoFilme: Genero[];
  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private dataService: DataserviceService,
              private router: Router) {  }

  get f() {
      return this.cadastroFilme.controls;
  }
  ngOnInit() {

    this.cadastroFilme = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: [''],
      notaIMDb: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
    this.generoFilme = this.dataService.getGeneros();
  }


  submit(): void {
    this.cadastroFilme.markAllAsTouched();
    if (this.cadastroFilme.invalid) {
      return;
    }
    const filme = this.cadastroFilme.getRawValue() as Filme;
    this.salvar(filme);
    // alert('cadastro realized com sucesso!\n\n' + JSON.stringify(this.cadastroFilme.value,null,4));
  }
  reiniciarForm(): void {
    this.cadastroFilme.reset();
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

}
