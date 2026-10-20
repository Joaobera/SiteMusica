const classes = document.querySelectorAll(".molde-capa");
const divFlutuante = document.querySelector(".flutuante");
const divPaiFlutuante = document.querySelector(".pai-flutuante")
const player = document.getElementById("player");
const divPlayer = document.querySelector(".div-player");
const form = document.querySelector("#pesquisa");
const input = document.querySelector("#input-pesquisa");
const formEntrar = document.querySelector("#form-entrar");
const inputEntrar = document.querySelector("#input-entrar");
const formCadastrar = document.querySelector("#form-cadastrar");
const inputCadastrar = document.querySelector("#input-cadastrar");
const btnVoltar = document.getElementById("btn-voltar");

btnVoltar.addEventListener('click', ()=>{
    divFlutuante.style.display = "none";
    divPaiFlutuante.style.display = "none"
    player.pause();

})

formEntrar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dadosLogin = inputEntrar.value;


    async function login() {
        try {
            const response = await fetch('http://localhost:5157/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            })

            if (response.ok === false) {
                const erroTexto = await response.text();
                throw new Error(erroTexto);
            }

            const data = await response.json();
            console.log(data);

            alert("Que bom que retornou!")
        }
        catch (erro) {

            console.error(erro.message);

            alert("Usuario não encontrado!")
        }
    }

    login();


    inputEntrar.value = "";
})

formCadastrar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dadosCadastrar = inputCadastrar.value;

    const jsonCadastro = {
        nome: dadosCadastrar
    }

    async function cadastro() {
        try {
            const response = await fetch('http://localhost:5157/api/usuarios/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonCadastro)
            })

            if (response.ok === false) {
                const erroTexto = await response.text()
                throw new Error(erroTexto || 'erro na requisição!');
            }

            const data = await response.json();
            console.log(data);

            alert("Cadastro realizado com sucesso! entre na sua conta!");
        }
        catch (erro) {

            console.error(erro.message);

            alert("Erro ao cadastrar!")
        }
    }

    cadastro();

    

    inputCadastrar.value = "";
})


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const musicaPesquisada = input.value;

    classes.forEach(e => {
        const paragrafo = e.querySelector("p");

        const texto = paragrafo.textContent.toLowerCase();

        if (texto.replaceAll(".", "") === musicaPesquisada.toLowerCase()) {
            e.style.display = "flex";
            return;
        }

        e.style.display = "none";
    })

    input.value = "";
})

classes.forEach(e => {

    e.addEventListener('click', () => {

        const idDaMusica = e.dataset.id;

        divFlutuante.style.display = "block";

        divPaiFlutuante.style.display = "flex"

        const imagem = e.querySelector("img");

        const urlImage = imagem.src;

        const imagePlayer = divPlayer.querySelector("img");

        imagePlayer.src = urlImage;

        async function buscarMusica(id) {

            try {
                const url = `http://localhost:5157/api/musicas/${id}`;

                const resposta = await fetch(url);

                if (!resposta.ok) {
                    throw new Error(`Erro na requisição: ${resposta.status}`);
                }

                const dados = await resposta.json();

                console.log(dados);

                player.src = (`musicas/${dados.caminho}`);


            }
            catch (erro) {
                console.error(erro.message);
            }



        }

        buscarMusica(idDaMusica);

    })

});