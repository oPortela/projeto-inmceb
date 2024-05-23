document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-cotacao');

    // Adicionar evento para pesquisar fornecedor
    formulario.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('pesquisar-fornecedor')) {
            const divFornecedor = target.closest('.fornecedor');
            const codigoFornecedor = divFornecedor.querySelector('.info-fornecedor input[name^="codigoFornecedor"]').value;

            // Fazer requisição AJAX para buscar dados do fornecedor
            // Exemplo de URL fictícia, substitua pela sua API real
            const url = `http://exemplo-api.com/fornecedor/${codigoFornecedor}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .then(data => {
                    // Preencher os campos com os dados recebidos
                    divFornecedor.querySelector('.info-fornecedor input[name^="nomeFornecedor"]').value = data.nome;
                    divFornecedor.querySelector('.info-fornecedor input[name^="cnpjFornecedor"]').value = data.cnpj;
                    divFornecedor.querySelector('.info-fornecedor input[name^="enderecoFornecedor"]').value = data.endereco;
                    divFornecedor.querySelector('.info-fornecedor input[name^="emailFornecedor"]').value = data.email;
                    divFornecedor.querySelector('.info-fornecedor input[name^="telefoneFornecedor"]').value = data.telefone;
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                    alert('Erro ao buscar informações do fornecedor. Verifique o código informado.');
                });
        }

        // Adicionar evento para adicionar produto
        if (target.classList.contains('adicionar-produto')) {
            const divProdutos = target.closest('.fornecedor').querySelector('.produtos');
            const numProdutos = divProdutos.querySelectorAll('.produto').length + 1;

            const novoProduto = `
                <div class="produto">
                    <input type="text" name="produto${numProdutos}" placeholder="Produto">
                    <input type="number" name="quantidade${numProdutos}" placeholder="Quantidade">
                    <input type="text" name="embalagem${numProdutos}" placeholder="Embalagem">
                    <input type="number" name="preco${numProdutos}" placeholder="Preço">
                    <input type="number" name="desconto${numProdutos}" placeholder="Desconto">
                    <input type="number" name="precoFinal${numProdutos}" placeholder="Preço Final">
                    <button type="button" class="remover-produto">Remover</button>
                </div>
            `;

            divProdutos.insertAdjacentHTML('beforeend', novoProduto);
        }

        //remover produto
        if (target.classList.contains('remover-produto')) {
            const divProduto = target.closest('.produto');
            divProduto.remove();
        }

        //remover fornecedor
        if (target.classList.contains('remover-fornecedor')) {
            const divFornecedor = target.closest('.fornecedor');
            divFornecedor.remove();
        }
    });

    // Função para adicionar fornecedor
    const btnAdicionarFornecedor = document.getElementById('adicionar-fornecedor');
    btnAdicionarFornecedor.addEventListener('click', function() {
        adicionarFornecedor();
    });

    // Função para adicionar fornecedor
    function adicionarFornecedor() {
        const divFornecedor = document.createElement('div');
        divFornecedor.classList.add('fornecedor');

        let numFornecedores = document.querySelectorAll('.fornecedor').length + 1;
        divFornecedor.innerHTML = `
        <fieldset>
            <legend>Fornecedor ${numFornecedores}</legend>
            <div class="info-fornecedor">
                <label>Código: <input type="text" name="codigoFornecedor${numFornecedores}" required></label>
                <label>Nome: <input type="text" name="nomeFornecedor${numFornecedores}" readonly></label>
                <label>CNPJ: <input type="text" name="cnpjFornecedor${numFornecedores}" readonly></label>
                <label>Endereço: <input type="text" name="enderecoFornecedor${numFornecedores}" readonly></label>
                <label>E-mail: <input type="email" name="emailFornecedor${numFornecedores}" readonly></label>
                <label>Telefone: <input type="tel" name="telefoneFornecedor${numFornecedores}" readonly></label>
            </div>
        </fieldset>
        <button type="button" class="pesquisar-fornecedor">Pesquisar Fornecedor</button>
        <button type="button" class="remover-fornecedor">Remover Fornecedor</button>
        <button type="button" class="adicionar-produto">Adicionar Produto</button>
        <div class="produtos">
            <!-- Produtos serão adicionados aqui dinamicamente -->
        </div>
        <div id="arquivo-cotacao">
            <label id="arquivo" for="file-input">
                <img src="imagens/documento.png" alt="icone-documento">
                <input id="file-input" type="file" name="image" onchange="displayFileName(event)">
            </label>
            <span id="file-name"></span>
        </div>
        `;

        formulario.insertBefore(divFornecedor, btnAdicionarFornecedor);
    }
});