// Carrega e exibe os alunos na tabela, com botão de remover por linha

function carregarTabela() {
    const listaSalva = localStorage.getItem('listaAlunos');
    const alunos = listaSalva ? JSON.parse(listaSalva) : [];

    const corpoTabela = document.querySelector('#tabela-alunos tbody');
    corpoTabela.innerHTML = ''; // Limpa antes de redesenhar

    const avisoVazio = document.getElementById('sem-alunos');

    if (alunos.length === 0) {
        if (avisoVazio) avisoVazio.hidden = false;
        return;
    }

    if (avisoVazio) avisoVazio.hidden = true;

    alunos.forEach((aluno, indice) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td>
                <button class="btn-remover" data-indice="${indice}">Remover</button>
            </td>
        `;

        corpoTabela.appendChild(linha);
    });

    // Adiciona o evento de remover em cada botão da tabela
    corpoTabela.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', function () {
            const i = parseInt(this.dataset.indice);
            removerAluno(i);
        });
    });
}

// Remove o aluno pelo índice e recarrega tudo
function removerAluno(indice) {
    const listaSalva = localStorage.getItem('listaAlunos');
    const alunos = listaSalva ? JSON.parse(listaSalva) : [];

    alunos.splice(indice, 1);
    localStorage.setItem('listaAlunos', JSON.stringify(alunos));

    carregarTabela();

    // Também atualiza o select de exclusão, se existir na página
    if (typeof preencherSelect === 'function') {
        preencherSelect();
    }
}

// Roda ao carregar a página
carregarTabela();
