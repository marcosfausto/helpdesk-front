import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creeds).subscribe(resposta => {
      this.service.sucessfulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    },
      () => {
        this.toast.error('Usuário e/ou senha inválidos')
      })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
