export interface Cliente {
    id?: any; // posso ou não passar um id
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[];
    dataCriacao: any; // string ou date
}