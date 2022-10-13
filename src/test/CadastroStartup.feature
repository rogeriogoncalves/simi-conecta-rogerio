#language: pt

Funcionalidade: Cadastar Startup
Como um gestor de startup
Quero suporte de capital financeiro e humano
Para suportar um crescimento não organico da organização

Contexto: Startup iniciando o uso do SIMI Conecta

Cenário: Cadastrar startup com sucesso
E acessa a pagina de Registro do SIMI
Quando finalizar a inclusão das preferencias
Então deve visualizar a tela Inicial

Cenário: Cadastrar startup com erro
E acessa a pagina de Registro do SIMI
Quando finalizar a inclusão das preferencias
Então não visualizar a tela Inicial
