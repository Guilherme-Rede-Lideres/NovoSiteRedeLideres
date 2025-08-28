import { Component } from '@angular/core';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.component.html',
  styleUrl: './numeros.component.scss'
})
export class NumerosComponent  {
items = [
    { left: 'INTERAÇÕES', number: '10K', right: 'Com nossa tecnologia de inteligência de mercado' },
    { left: 'DECISÕES DE NEGÓCIOS', number: '150k', right: 'Realizadas por meio de nossas reuniões entre líderes' },
    { left: 'PROFISSIONAIS', number: '50', right: 'Cadastro na nossa base' },
    { left: 'ANOS ACOMPANHANDO O ECOSSISTEMA DIGITAL', number: '12', right: 'Desde 2013, reunimos as lideranças das empresas para decidir os rumos dos negócios' },
    { left: 'LÍDERES E TOMADORES DE DECISÃO', number: '560', right: 'Desde 2013, reunimos as lideranças das empresas para decidir os rumos dos negócios' },
    { left: 'ARTIGOS ESCRITOS', number: '1k', right: 'Pelas próprias lideranças atendidas' },
    { left: 'LIVROS', number: '5', right: 'Lançados e publicados' },
    { left: 'CONVÊNIOS', number: '10', right: 'Com as maiores universidades, faculdades e parques tecnológicos' }
  ];
}




