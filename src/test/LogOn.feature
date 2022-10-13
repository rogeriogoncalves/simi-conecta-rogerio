# language: pt

Funcionalidade: Login
Como usuário do SIMI
Investidor quer completar o Login
Para ter acessos as funcionalidades de usuário logado

Contexto: Dado que a conta de investidor foi criada com sucesso em cenário previo

Cenário: Login Valido
E acessa a pagina de Login do SIMI
E preenche as credenciais validas
Quando quando clicar no botão Entrar
Então deve visualizar a tela Inicial

Cenário: Login invalido
E acessa a pagina de Login do SIMI
E preenche as credenciais validas
Quando quando clicar no botão Entrar
Então não visualizar a tela Inicial