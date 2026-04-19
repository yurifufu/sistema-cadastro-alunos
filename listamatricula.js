// 1. Pega os dados
const dadosSalvosMatricula = localStorage.getItem('listaAlunos');
const alunosParaSelect = dadosSalvosMatricula ? JSON.parse(dadosSalvosMatricula) : [];

// 2. Pega o SELECT pelo ID NOVO que criamos
const meuSelect = document.getElementById('lista-exclusao');

// 3. Verifica se o SELECT realmente existe na página antes de continuar
if (meuSelect) {
    // Limpa o que tem dentro (deixa só o "Selecione")
    meuSelect.innerHTML = '<option value="">Selecione um aluno</option>';

    // 4. Preenche as opções
    alunosParaSelect.forEach(aluno => {
        const opcao = document.createElement('option');
        opcao.textContent = (aluno.matricula); // Aparece o nome
        opcao.value = aluno.matricula;  // Guarda a matrícula no valor
        meuSelect.appendChild(opcao);
    });
    
    console.log("Select preenchido com " + alunosParaSelect.length + " alunos.");
} else {
    console.error("ERRO: Não encontrei o select com ID 'lista-exclusao'. Verifique seu HTML!");
}
