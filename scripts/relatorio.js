document.addEventListener("DOMContentLoaded", function() {
    const statusCells = document.querySelectorAll("tbody td:nth-child(5)");

    statusCells.forEach(cell => {
        const status = cell.textContent.trim().toLowerCase();
        if (status === "aprovado") {
            cell.classList.add("status-aprovado");
        } else if (status === "pendente") {
            cell.classList.add("status-pendente");
        } else if (status === "reprovado") {
            cell.classList.add("status-reprovado");
        }
    });

    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', function() {
        const codigo = document.getElementById('codigo').value.trim();
        const data = document.getElementById('data').value.trim();
        const status = document.getElementById('status').value.trim().toLowerCase();
        
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const idCotacao = row.cells[0].textContent.trim();
            const rowData = row.cells[3].textContent.trim();
            const rowStatus = row.cells[4].textContent.trim().toLowerCase();
            
            let matchesCodigo = !codigo || idCotacao.includes(codigo);
            let matchesData = !data || rowData.includes(data);
            let matchesStatus = !status || rowStatus.includes(status);
            
            if (matchesCodigo && matchesData && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Função para preencher o modal com os detalhes da cotação
    function preencherDetalhesCotacao(cotacaoId) {
        let detalhesHTML = '';
        if (cotacaoId === '0001') {
            detalhesHTML = `
                <table>
                    <caption><h2>Fornecedor 01</h2></caption>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Produto</th>
                            <th>Embalagem</th>
                            <th>Preço</th>
                            <th>Desconto %</th>
                            <th>Preço Final</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dell Vostro 8gb 256gb</td>
                            <td>Un</td>
                            <td>R$ 2.500,00</td>
                            <td>10</td>
                            <td>R$ 2.250,00</td>
                            <td>Aprovado</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Monitor LG 24"</td>
                            <td>Un</td>
                            <td>R$ 1.000,00</td>
                            <td>5</td>
                            <td>R$ 950,00</td>
                            <td>Recusado</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Kit mouse e teclado dell</td>
                            <td>Cx</td>
                            <td>R$ 250,00</td>
                            <td>2</td>
                            <td>R$ 245,00</td>
                            <td>Recusado</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <caption><h2>Fornecedor 02</h2></caption>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Produto</th>
                            <th>Embalagem</th>
                            <th>Preço</th>
                            <th>Desconto %</th>
                            <th>Preço Final</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dell Inspiron 8gb 512gb</td>
                            <td>Un</td>
                            <td>R$ 3.500,00</td>
                            <td>10</td>
                            <td>R$ 3.150,00</td>
                            <td>Recusado</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Monitor LG 24"</td>
                            <td>Un</td>
                            <td>R$ 1.000,00</td>
                            <td>5</td>
                            <td>R$ 950,00</td>
                            <td>Aprovado</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Kit mouse e teclado dell</td>
                            <td>Cx</td>
                            <td>R$ 250,00</td>
                            <td>2</td>
                            <td>R$ 245,00</td>
                            <td>Aprovado</td>
                        </tr>
                    </tbody>
                </table>`;
        } else {
            detalhesHTML = '<p>Detalhes não disponíveis para esta cotação.</p>';
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(detalhesHTML, 'text/html');
        const tables = doc.querySelectorAll('table');

        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const statusCell = row.cells[6];
                const status = statusCell.textContent.trim().toLowerCase();

                if (status === 'aprovado') {
                    statusCell.classList.add('status-aprovado');
                } else if (status === 'recusado') {
                    statusCell.classList.add('status-reprovado');
                }
            });
        });

        document.getElementById('detalhesCotacao').innerHTML = doc.body.innerHTML;
    }

    
    document.querySelectorAll("tbody td:nth-child(1)").forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', function() {
            const cotacaoId = this.textContent.trim();
            preencherDetalhesCotacao(cotacaoId);
            document.getElementById("cotacaoModal").style.display = "block";
        });
    });

    // Fechar o modal
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        document.getElementById("cotacaoModal").style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == document.getElementById("cotacaoModal")) {
            document.getElementById("cotacaoModal").style.display = "none";
        }
    }

    // Imprimir o conteúdo do modal
    const printButton = document.getElementById('printButton');
    printButton.addEventListener('click', function() {
        const printContents = document.querySelector('.modal-content').innerHTML;
        const originalContents = document.body.innerHTML;

        const printWindow = window.open('', '', 'height=500, width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');

        printWindow.document.close();
        printWindow.print();
    });
});