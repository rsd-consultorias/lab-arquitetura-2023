import { Component, OnInit } from '@angular/core';
import { AbrirContaService } from '../services/abrir-conta.service';

@Component({
  selector: 'app-abrir-conta',
  templateUrl: './abrir-conta.component.html',
  styles: [
  ]
})
export class AbrirContaComponent implements OnInit {

  constructor(private abrirContaService: AbrirContaService) { }

  classes = ['bg-1', 'bg-2', 'bg-3']
  rotateClass = 'bg-1'
  mensagem?: string

  ngOnInit(): void {

    let contador = 0;
    setInterval(() => {
      this.rotateClass = this.classes[contador % this.classes.length]
      contador++
      if ((contador % this.classes.length) == 0) {
        contador = 1
      }
    }, 3500)
  }

  salvar() {
    this.abrirContaService.enviarDados({nome: 'Teste', cpf: '12345678901', dataNascimento: new Date('1984-01-01')}).subscribe(
      res => {
        this.mensagem = res.mensagem
      }
    )
  }
}
