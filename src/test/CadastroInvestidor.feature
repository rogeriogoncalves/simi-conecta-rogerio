# language: pt

Funcionalidade: Cadastar investidor
Como um Investidor
Quero investir em startup inovadoras
Para diversificar o portifolio de investimentos

Contexto: Investidor iniciando o uso do SIMI Conecta

Cenário: Cadastrar investidor com sucesso
E acessa a pagina de Registro do SIMI
Quando finalizar a inclusão das preferencias
Então deve visualizar a tela Inicial

Cenário: Cadastrar investidor com erro
E acessa a pagina de Registro do SIMI
Quando finalizar a inclusão das preferencias
Então não visualizar a tela Inicial