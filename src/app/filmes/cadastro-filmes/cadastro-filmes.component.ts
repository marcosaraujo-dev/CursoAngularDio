import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastroFilme: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  }
  salvar(): void{
    if(this.cadastroFilme.invalid){
      return;
    }
    alert('cadastro realizado com sucesso!\n\n'+ JSON.stringify(this.cadastroFilme.value,null,4))
  }
  reiniciarForm(): void{
    this.cadastroFilme.reset()
  }

}
