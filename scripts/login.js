document.getElementById('login-form').addEventListener('submit', function(event){
    //event.preventDefault()

    var username = document.getElementById('usuario').value 
    var password = document.getElementById('password').value 

    if (username === 'admin' && password === 'admin') {

        alert('Bem Vindo!')
    } else {
        alert('Usuário ou senha incorretos!')
        event.preventDefault()
    }
})