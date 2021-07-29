import { Genero } from './../../domain/genero';
import { DataserviceService } from './../../dataservice.service';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mas-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
  providers:[DataserviceService]
})
export class CadastroFilmesComponent implements OnInit {

  cadastroFilme: FormGroup;
  generoFilme: Genero[];
  constructor(public validacao: ValidarCamposService, private fb: FormBuilder, private dataService:DataserviceService) {

   }

  get f(){
      return this.cadastroFilme.controls;
  }
  ngOnInit() {

    this.cadastroFilme = this.fb.group({
      titulo: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['',[Validators.minLength(10)]],
      dataLancamento: ['',[Validators.required]],
      descricao: [''],
      notaIMDB:[0,[Validators.required,Validators.min(0),Validators.max(10)]],
      urlIMDB:['',[Validators.minLength(10)]],
      genero:['',[Validators.required]]
    });
    this.generoFilme = this.dataService.getGeneros();
  }


  salvar(): void{
    this.cadastroFilme.markAllAsTouched();
    if(this.cadastroFilme.invalid){
      return;
    }
    alert('cadastro realizado com sucesso!\n\n'+ JSON.stringify(this.cadastroFilme.value,null,4))
  }
  reiniciarForm(): void{
    this.cadastroFilme.reset()
  }

}
