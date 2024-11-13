import api from "./api.js";

document.querySelectorAll('.btnCurtida').forEach(button => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('i');
    if (icon.classList.contains('bi-heart')) {
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
    } else {
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
    }

    const likeCountElement = button.querySelector('.like-count');
    let likeCount = parseInt(likeCountElement.textContent);
    likeCount = icon.classList.contains('bi-heart-fill') ? likeCount + 1 : likeCount - 1;

    likeCountElement.textContent = likeCount;
  });
});

const ui = {
  async renderizarFeed() {
    const feedComunidade = document.getElementById("feed-comunidade");
    feedComunidade.innerHTML = ""
    try {
      const mensagens = await api.buscarFeed();
      mensagens.forEach(ui.addMensagem);
    } catch (error) {
      alert('Erro ao renderizar as mensagens');
    }
  },

  addMensagem(mensagem) {
    const feedComunidade = document.getElementById("feed-comunidade");

    const postItem = document.createElement('div');
    postItem.classList.add('post-item');
    postItem.id = mensagem.id;

    const post = document.createElement('div');
    post.classList.add('post');

    const postImg = document.createElement('div');
    postImg.classList.add('post-img');
    const img = document.createElement('img');

    if (mensagem.anonimo === true) {
        img.src = "src/assets/imgs/user-anonimo.png";
        img.alt = "Anônimo";
    } else {
        img.src = mensagem.autorImagem || "src/assets/imgs/user-anonimo.png";
        img.alt = mensagem.autor;
    }
    postImg.appendChild(img);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postTop = document.createElement('div');
    postTop.classList.add('post-top');

    const postTopContent = document.createElement('div');
    postTopContent.classList.add('post-top-content');

    // Cria o h2 para o nome do autor e adiciona a mini imagem
    const h2 = document.createElement('h2');
    const miniImg = document.createElement('img');

    if (mensagem.anonimo === true) {
        miniImg.src = "src/assets/imgs/user-anonimo.png";
        miniImg.alt = "Anônimo";
    } else {
        miniImg.src = mensagem.autorImagem || "src/assets/imgs/user-anonimo.png";
        miniImg.alt = mensagem.autor;
    }
    miniImg.classList.add('mini-img'); // Adiciona uma classe para reconhecimento, caso precise de estilo no futuro
    h2.appendChild(miniImg); // Adiciona a mini imagem ao lado do nome

    // Define o texto do nome do autor
    h2.appendChild(document.createTextNode(mensagem.anonimo ? "Anônimo" : mensagem.autor));
    postTopContent.appendChild(h2);
    postTop.appendChild(postTopContent);

    const postInteraction = document.createElement('div');
    postInteraction.classList.add('post-interaction');
    const btnComentarios = document.createElement('button');
    btnComentarios.type = 'button';
    btnComentarios.id = 'btnComentarios';
    const iconComentario = document.createElement('i');
    iconComentario.classList.add('bi', 'bi-chat-dots');
    const spanComentario = document.createElement('span');
    spanComentario.classList.add('post-count', 'comment-count');
    spanComentario.textContent = mensagem.comentarios;
    iconComentario.appendChild(spanComentario);
    btnComentarios.appendChild(iconComentario);

    const btnCurtida = document.createElement('button');
    btnCurtida.classList.add('btnCurtida');
    const iconCurtida = document.createElement('i');
    iconCurtida.classList.add('bi', 'bi-heart');
    const spanCurtida = document.createElement('span');
    spanCurtida.classList.add('post-count', 'like-count');
    spanCurtida.textContent = mensagem.likes;
    iconCurtida.appendChild(spanCurtida);
    btnCurtida.appendChild(iconCurtida);

    postInteraction.appendChild(btnComentarios);
    postInteraction.appendChild(btnCurtida);
    postTop.appendChild(postInteraction);
    postContent.appendChild(postTop);

    const postText = document.createElement('div');
    postText.classList.add('post-text');
    const p = document.createElement('p');
    p.textContent = mensagem.content;
    postText.appendChild(p);
    postContent.appendChild(postText);

    post.appendChild(postImg);
    post.appendChild(postContent);
    postItem.appendChild(post);

    feedComunidade.appendChild(postItem);
},


};

export default ui;
