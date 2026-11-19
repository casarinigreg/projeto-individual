// sessão
function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_CLIENTE;

    let b_usuario = document.getElementById("nome_usuario");
    let avatar_usuario = document.getElementById("avatar_usuario");

    if (email != null && nome != null) {
        // Atualiza elementos de usuário somente se existirem na página atual
        if (b_usuario) b_usuario.textContent = nome;

        if (avatar_usuario) {
            let iniciais = nome.split(" ");

            if (iniciais.length >= 2) {
                iniciais = (iniciais[0][0] + iniciais[1][0]).toUpperCase(); // ['MARCOS', 'PEREIRA'] = 'MP'
            } else {
                // protege caso o nome tenha apenas 1 letra
                const first = (iniciais[0] && iniciais[0][0]) ? iniciais[0][0] : '';
                const second = (iniciais[0] && iniciais[0][1]) ? iniciais[0][1] : '';
                iniciais = (first + second).toUpperCase(); // ['MARCOS'] = 'MA'
            }

            avatar_usuario.textContent = iniciais;
        }


    } else {
     window.location = "./login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
}

function mostrarPopup(mensagem) {
    mensagemPopup.textContent = mensagem;
    popup.style.display = "flex";
}

function fecharPopup() {
    popup.style.display = "none";
}
