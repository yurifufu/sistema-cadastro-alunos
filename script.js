// Pega o formulário da página
const form = document.getElementById('form-aluno');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Lê os valores dos campos
    const nome      = document.getElementById('nome').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const email     = document.getElementById('email').value.trim();
    const turma     = document.getElementById('turma').value;

    // Esconde mensagens anteriores
    document.getElementById('mensagem-sucesso').hidden   = true;
    document.getElementById('mensagem-duplicada').hidden = true;

    // --- VALIDAÇÕES ---
    let valido = true;

    // Nome
    if (nome === '') {
        mostrarErro('nome', 'Nome é obrigatório.');
        valido = false;
    } else if (nome.length < 3) {
        mostrarErro('nome', 'Nome deve ter pelo menos 3 caracteres.');
        valido = false;
    } else {
        limparErro('nome');
    }  

    // Matrícula
    if (matricula === '') {
        mostrarErro('matricula', 'Matrícula é obrigatória.');
        valido = false;
    } else if (!/^\d{6,10}$/.test(matricula)) {
        mostrarErro('matricula', 'Matrícula deve ter entre 6 e 10 dígitos numéricos.');
        valido = false;
    } else {
        limparErro('matricula');
    }

    // E-mail
    if (email === '') {
        mostrarErro('email', 'E-mail é obrigatório.');
        valido = false;
    } else if (!email.includes('@')) {
        mostrarErro('email', 'Informe um e-mail válido.');
        valido = false;
    } else {
        limparErro('email');
    }

    // Turma
    if (turma === '') {
        mostrarErro('turma', 'Selecione uma turma.');
        valido = false;
    } else {
        limparErro('turma');
    }

    if (!valido) return;

    // --- VERIFICA DUPLICATA ---
    const listaSalva = localStorage.getItem('listaAlunos');
    const alunos = listaSalva ? JSON.parse(listaSalva) : [];

    const duplicado = alunos.some(a => a.matricula === matricula);
    if (duplicado) {
        mostrarErro('matricula', 'Já existe um aluno com essa matrícula.');
        document.getElementById('mensagem-duplicada').hidden = false;
        return;
    }

    // --- SALVA O ALUNO ---
    alunos.push({ nome, matricula, email, turma });
    localStorage.setItem('listaAlunos', JSON.stringify(alunos));

    document.getElementById('mensagem-sucesso').hidden = false;
    form.reset();
    // Remove os estados visuais de validação
    form.querySelectorAll('.form-control').forEach(c => c.classList.remove('valido'));
});

// Mostra erro em um campo
function mostrarErro(campoId, mensagem) {
    const controle = document.getElementById(campoId).closest('.form-control');
    controle.classList.add('invalido');
    controle.classList.remove('valido');
    controle.querySelector('.erro').textContent = mensagem;
}

// Limpa erro de um campo
function limparErro(campoId) {
    const controle = document.getElementById(campoId).closest('.form-control');
    controle.classList.remove('invalido');
    controle.classList.add('valido');
    controle.querySelector('.erro').textContent = '';
}
