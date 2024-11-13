document.addEventListener("DOMContentLoaded", function() {
    carregarMensagens(); // Carrega mensagens quando a página é carregada

    document.getElementById("formMensagem").addEventListener("submit", function (event) {
        event.preventDefault();

        const conteudo = document.getElementById("conteudo").value;
        const anonimo = document.getElementById("btn-anonimo").classList.contains("active");

        const mensagem = {
            nome: anonimo ? "Anônimo" : "Seu Nome", // Nome do usuário
            conteudo,
            anonimo
        };

        fetch('./data/mensagens.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mensagem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Mensagem enviada:", data);
            document.getElementById("formMensagem").reset(); // Limpa o formulário
            carregarMensagens(); // Atualiza a lista de mensagens
        })
        .catch(error => console.error("Erro ao enviar mensagem:", error));
    });
});

// Função para carregar mensagens do servidor
function carregarMensagens() {
    fetch('./data/mensagens.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(mensagens => {
            const containerMensagens = document.getElementById("mensagens");
            containerMensagens.innerHTML = ''; // Limpa o container

            mensagens.forEach(mensagem => {
                const divMensagem = document.createElement('div');
                divMensagem.classList.add('mensagem');
                divMensagem.innerHTML = `
                    <strong>${mensagem.nome}</strong>: ${mensagem.conteudo}
                `;
                containerMensagens.appendChild(divMensagem);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar mensagens:", error);
        });
}
