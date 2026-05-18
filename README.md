# Sistema de Cadastro de Alunos Web — Entrega 1

> **Disciplina:** Qualidade de Software  
> **Docente:** Prof. Esp. Nailton Silva dos Santos  
> **Instituição:** Universidade Federal de Rondonópolis – UFR  
> **Ano:** 2026

**Autores:** Bruno Gabriel Palmeira da Costa Paniago · Kazuo Vitor Moraes Aiura · Matheus Bernard Rocha Baldoino · Yasmin Almeida Cavalcante · Yuri Felipe Fudizachi Lima

---

## Sumário

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos de Qualidade](#requisitos-de-qualidade-não-funcionais)
- [Critérios de Aceite](#critérios-de-aceite)
- [Casos de Teste](#casos-de-teste)
- [Estrutura dos Arquivos](#estrutura-dos-arquivos)
- [Repositório](#repositório)

---

## Visão Geral do Projeto

Este sistema web permite o **cadastro**, **listagem** e **remoção** de alunos diretamente no navegador, sem necessidade de servidor ou banco de dados externo. Os dados são armazenados no `localStorage` do navegador, garantindo persistência entre sessões.

O sistema é composto por duas páginas:

| Página | Descrição |
|--------|-----------|
| `index.html` | Formulário de cadastro de alunos |
| `gerenciamento.html` | Listagem completa e exclusão de alunos |

---

## Requisitos Funcionais

### 2.1 Cadastro de Alunos

- Formulário com campos: **Nome completo**, **Matrícula**, **E-mail** e **Turma**
- Validação de todos os campos antes de salvar
- Impedimento de matrícula duplicada com mensagem de erro clara
- Exibição de mensagem de sucesso ao cadastrar
- Persistência dos dados via `localStorage`

### 2.2 Gerenciamento de Alunos

- Tabela listando todos os alunos cadastrados (nome, matrícula, e-mail, turma)
- Botão **Remover** em cada linha da tabela para exclusão direta
- `<select>` com lista de alunos para exclusão pelo campo de matrícula
- Mensagem de confirmação após exclusão

---

## Requisitos de Qualidade (Não Funcionais)

| Requisito | Descrição |
|-----------|-----------|
| **Usabilidade** | Mensagens de erro claras e próximas ao campo com problema; campos obrigatórios destacados visualmente com borda colorida ao falhar ou passar na validação. |
| **Integridade dos Dados** | Não é possível cadastrar dois alunos com a mesma matrícula. Todos os campos passam por validação antes de salvar no `localStorage`. |
| **Desempenho Perceptível** | A resposta ao envio do formulário é imediata (sem recarregamento de página). Adição e remoção de alunos atualizam a tela instantaneamente. |
| **Legibilidade do Layout** | Interface limpa, paleta de cores coerente (tons de rosa/vinho). Hierarquia visual clara entre títulos e campos. |
| **Legibilidade do Código** | Scripts organizados com comentários explicativos, sem lógica desnecessariamente complexa. Funções nomeadas (`mostrarErro`, `limparErro`, `carregarTabela`) facilitam a leitura. |

---

## Critérios de Aceite

### 4.1 Cadastro de Aluno

O cadastro será aceito quando:

- [ ] Impedir o envio do formulário com qualquer campo em branco, exibindo mensagem de erro no campo correspondente
- [ ] Impedir matrícula com menos de 6 ou mais de 10 dígitos numéricos
- [ ] Impedir matrícula já existente no sistema com mensagem de erro visível
- [ ] Exibir mensagem de sucesso verde ao concluir o cadastro com dados válidos
- [ ] Limpar o formulário após o cadastro bem-sucedido

### 4.2 Listagem de Alunos

A listagem será aceita quando:

- [ ] Exibir todos os alunos cadastrados no `localStorage` ao abrir a página de gerenciamento
- [ ] Exibir mensagem `Nenhum aluno cadastrado` quando a lista estiver vazia
- [ ] Atualizar a tabela imediatamente após uma remoção, sem recarregar a página

### 4.3 Remoção de Aluno

A remoção será aceita quando:

- [ ] O botão **Remover** em cada linha da tabela excluir corretamente o aluno correspondente
- [ ] O `<select>` de exclusão por matrícula remover o aluno selecionado ao clicar no botão **Excluir**
- [ ] Exibir mensagem de erro se o botão **Excluir** for clicado sem seleção no `<select>`
- [ ] Exibir confirmação de sucesso após remoção bem-sucedida

---

## Casos de Teste

| ID | Cenário | Passos | Resultado Esperado | Status |
|----|---------|--------|--------------------|--------|
| T01 | Cadastro com todos os campos válidos | 1. Preencher nome, matrícula (7 dígitos), e-mail e turma. 2. Clicar em **Cadastrar**. | Aluno salvo no `localStorage`. Mensagem de sucesso exibida. Formulário limpo. | — |
| T02 | Tentativa de cadastro com campo Nome em branco | 1. Deixar o campo **Nome** vazio. 2. Preencher os demais campos. 3. Clicar em **Cadastrar**. | Erro exibido abaixo do campo Nome: `Nome é obrigatório.` Formulário não enviado. | — |
| T03 | Tentativa de cadastro com matrícula duplicada | 1. Cadastrar um aluno com matrícula `2026001`. 2. Tentar cadastrar outro aluno com a mesma matrícula `2026001`. | Erro exibido no campo matrícula: `Já existe um aluno com essa matrícula.` Cadastro bloqueado. | — |
| T04 | Matrícula fora do tamanho permitido | 1. Digitar uma matrícula com 3 dígitos no campo. 2. Clicar em **Cadastrar**. | Erro exibido: `Matrícula deve ter entre 6 e 10 dígitos numéricos.` Cadastro bloqueado. | — |
| T05 | Remoção de aluno pela tabela | 1. Abrir a página de Gerenciamento com ao menos 1 aluno cadastrado. 2. Clicar no botão **Remover** na linha do aluno desejado. | Aluno removido do `localStorage`. Tabela atualizada imediatamente. `<select>` de exclusão também atualizado. | — |

---

## Estrutura dos Arquivos

```
sistema-cadastro-alunos/
├── index.html              # Página principal com o formulário de cadastro
├── gerenciamento.html      # Página de gerenciamento: tabela de alunos e exclusão
├── styles.css              # Estilos globais: layout, cores, formulário, tabela e responsividade
├── script.js               # Lógica do formulário: validação, verificação de duplicatas e salvamento
├── exibir.js               # Carrega e renderiza a tabela; gerencia remoção por linha
└── listagemmatricula.js    # Preenche o select de exclusão; gerencia remoção pelo select + botão
```

| Arquivo | Responsabilidade |
|---------|-----------------|
| `index.html` | Página principal com o formulário de cadastro de alunos |
| `gerenciamento.html` | Página de gerenciamento: tabela de alunos e exclusão |
| `styles.css` | Estilos globais: layout, cores, formulário, tabela e responsividade |
| `script.js` | Lógica do formulário: validação, verificação de duplicatas e salvamento no `localStorage` |
| `exibir.js` | Carrega e renderiza a tabela de alunos; gerencia remoção por linha |
| `listagemmatricula.js` | Preenche o `<select>` de exclusão; gerencia remoção pelo select + botão |

---

## Repositório

🔗 [https://github.com/yurifufu/sistema-cadastro-alunos](https://github.com/yurifufu/sistema-cadastro-alunos)
