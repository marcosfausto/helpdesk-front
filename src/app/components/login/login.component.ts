import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from '../models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creeds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email); // validação para email
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logar() {
    this.toast.error('Usuário e/ou senha inválidos!', 'Login');
    this.creeds.senha = ''
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
