// 1. Pegamos a string da "gaveta"
const dadosSalvos = localStorage.getItem('listaAlunos');

// 2. Transformamos a string de volta em um Array de objetos (JSON.parse)
// Se não houver nada, usamos um array vazio []
const listaAlunos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

// 3. Selecionamos o corpo da tabela onde os dados vao entrar
const corpoTabela = document.querySelector('#tabela-alunos tbody');

// 4. Percorremos a lista de alunos e criamos as linhas (HTML)
listaAlunos.forEach(aluno => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.email}</td>
        <td>${aluno.turma}</td>
    `;

    corpoTabela.appendChild(linha);
});
