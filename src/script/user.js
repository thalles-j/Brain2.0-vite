window.addEventListener('load', () => {
    let usuarioLogado = sessionStorage.getItem('usuarioLogado');
    let sair = sessionStorage.getItem('sair');

    if (usuarioLogado) {
        document.querySelectorAll('#user').forEach(function(element) {
            element.innerHTML = usuarioLogado;
        });


        document.querySelectorAll('#login-drop').forEach(function(element) {
            element.innerHTML = sair;
        });


        document.querySelector('#leave').addEventListener('click', function() {

            sessionStorage.setItem('usuarioLogado', '');
            sessionStorage.setItem('usuarioImagem', ''); 
            sessionStorage.setItem('sair', ''); 
            sessionStorage.setItem('usuarioEstaLogado', 'false');

            document.querySelectorAll('#user').forEach(function(element) {
                element.innerHTML = '';
            });

            document.querySelectorAll('#login-drop').forEach(function(element) {
                element.innerHTML = '';
            });

            window.location.href = 'login.html'; 
        });
    }
});
