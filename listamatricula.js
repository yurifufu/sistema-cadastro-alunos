// Preenche o select e gerencia a exclusão pelo botão

function preencherSelect() {
    const meuSelect = document.getElementById('lista-exclusao');
    if (!meuSelect) return;

    const listaSalva = localStorage.getItem('listaAlunos');
    const alunos = listaSalva ? JSON.parse(listaSalva) : [];

    // Redefine as opções
    meuSelect.innerHTML = '<option value="">Selecione um aluno pela matrícula</option>';

    alunos.forEach(aluno => {
        const opcao = document.createElement('option');
        opcao.textContent = `${aluno.matricula} – ${aluno.nome}`;
        opcao.value = aluno.matricula;
        meuSelect.appendChild(opcao);
    });
}

// Botão de excluir pelo select
const btnExcluir = document.getElementById('btn-excluir');
const msgExclusao = document.getElementById('mensagem-exclusao');

if (btnExcluir) {
    btnExcluir.addEventListener('click', function () {
        const matriculaSelecionada = document.getElementById('lista-exclusao').value;

        if (!matriculaSelecionada) {
            exibirMensagemExclusao('Selecione um aluno para excluir.', 'erro-msg');
            return;
        }

        const listaSalva = localStorage.getItem('listaAlunos');
        let alunos = listaSalva ? JSON.parse(listaSalva) : [];

        alunos = alunos.filter(a => a.matricula !== matriculaSelecionada);
        localStorage.setItem('listaAlunos', JSON.stringify(alunos));

        exibirMensagemExclusao('✅ Aluno removido com sucesso!', 'sucesso');

        // Atualiza tabela e select
        carregarTabela();
        preencherSelect();
    });
}

function exibirMensagemExclusao(texto, classe) {
    if (!msgExclusao) return;
    msgExclusao.textContent = texto;
    msgExclusao.className = 'mensagem ' + classe;
    msgExclusao.hidden = false;

    // Some depois de 3 segundos
    setTimeout(() => { msgExclusao.hidden = true; }, 3000);
}

// Inicializa o select ao carregar
preencherSelect();
