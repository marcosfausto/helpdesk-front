import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Chamado } from '../../models/chamado';
import { Cliente } from '../../models/cliente';
import { Tecnico } from '../../models/tecnico';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])


  constructor(
    private clienteService: ClienteService,
    private chamadoService: ChamadoService,
    private tecnicoService: TecnicoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastrService.success('Chamado atualizado com sucesso', 'Atualizar chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastrService.error(ex.error.error);
    })
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(() => {
      this.toastrService.success('Chamado atualizado com sucesso', 'Update');
      this.router.navigate(['chamados'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastrService.error(element.message);
        });
      } else {
        this.toastrService.error(ex.error.message);
      }
    })
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    })
  }

  cancelar(): void {
      this.router.navigate(['chamados']);
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid &&
    this.titulo.valid && this.observacoes.valid &&
    this.tecnico.valid && this.cliente.valid;
  }

  retornaStatus(status: any): string {
    if (status == 0) {
      return 'ABERTO';
    } else if (status == 1) {
      return 'EM ANDAMENTO';
    } else {
      return 'FECHADO';
    }
  }

  
  retornaPrioridade(prioridade: any): string {
    if (prioridade == 0) {
      return 'BAIXA';
    } else if (prioridade == 1) {
      return 'MÉDIA';
    } else {
      return 'ALTA';
    }
  }

}
