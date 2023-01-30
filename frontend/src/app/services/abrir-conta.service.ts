import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AbrirContaService {

  constructor(private httpClient: HttpClient) { }

  enviarDados(props: { nome: string, cpf: string, dataNascimento: Date }): Observable<any> {
    // Chamar api
    return this.httpClient.post('http://localhost:4201/api/v1/abertura-conta', props)
  }
}
