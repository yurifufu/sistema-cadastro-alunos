const form = document.getElementById('form-aluno')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('formulário enviado!')

    const nome = document.getElementById('nome').value
    const matricula = document.getElementById('matricula').value
    const email = document.getElementById('email').value
    const turma = document.getElementById('turma').value

    const alunos = {
        nome: nome,
        matricula: matricula,
        email: email,
        turma: turma
    };

    let valido = true

    if (nome == '') {
        document.querySelector('#nome + .erro').textContent = 'Nome é obrigatório'
        valido = false
    } else if (nome.length < 3) {
        document.querySelector('#nome + .erro').textContent = 'Nome muito curto'
        valido = false
    } else {
        document.querySelector('#nome + .erro').textContent = ''
    }

    if (matricula == '') {
        document.querySelector('#matricula + .erro').textContent = 'Matrícula é obrigatória'
        valido = false
    } else if (matricula.length < 6 || matricula.length > 10) {
        document.querySelector('#matricula + .erro').textContent = 'Matrícula deve ter entre 6 e 10 números'
        valido = false
    } else {
        document.querySelector('#matricula + .erro').textContent = ''
    }

    if (email == '') {
        document.querySelector('#email + .erro').textContent = 'E-mail é obrigatório'
        valido = false
    } else {
        document.querySelector('#email + .erro').textContent = ''
    }

    if (turma == '') {
        document.querySelector('#turma + .erro').textContent = 'Selecione uma turma'
        valido = false
    } else {
        document.querySelector('#turma + .erro').textContent = ''
    }

    if (valido == true) {
        let listaNoNavegador = localStorage.getItem('listaAlunos');
        let alunosCadastrados = listaNoNavegador ? JSON.parse(listaNoNavegador) : [];


        alunosCadastrados.push(alunos);


        localStorage.setItem('listaAlunos', JSON.stringify(alunosCadastrados));


        console.log('Aluno salvo com sucesso!');
        document.getElementById('mensagem-sucesso').hidden = false;
        form.reset();
    }
})
