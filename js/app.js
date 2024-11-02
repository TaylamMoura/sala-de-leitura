// 'AIzaSyDlB3Lnw15_9TtXRqn8Ip1L5C2LUAH7hmE'


function adicionarLivro(){
    const buscarLivroForm = document.getElementById('buscarLivroForm');
    buscarLivroForm.style.display = 'block';
    buscarLivroForm.innerHTML = `
        <input type="text" id="tituloLivro" placeholder="Digite o título do livro">
        <button type="submit">Buscar</button>
    `;
    buscarLivroForm.onsubmit = buscarLivro;
}

function buscarLivro() {
    event.preventDefault();
    const titulo = document.getElementById('tituloLivro').value;
    const apiKey = 'AIzaSyDlB3Lnw15_9TtXRqn8Ip1L5C2LUAH7hmE';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${titulo}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const livros = data.items;
            const buscarLivroForm = document.getElementById('buscarLivroForm');
            buscarLivroForm.innerHTML = '';

            livros.forEach(livro => {
                const capa = livro.volumeInfo.imageLinks?.thumbnail;
                if (capa) {
                    const img = document.createElement('img');
                    img.src = capa;
                    img.style.cursor = 'pointer';
                    img.onclick = () => adicionarCapa(livro);

                    buscarLivroForm.appendChild(img);
                }
            });
            const voltarBtn = document.createElement('button');
            voltarBtn.textContent = 'Voltar';
            voltarBtn.onclick = () => {
                buscarLivroForm.style.display = 'none';
                buscarLivroForm.innerText = `
                    <input type="text" id="tituloLivro" placeholder="Digite o título do livro">
                    <button type="submit">Buscar</button>
                `;
                buscarLivroForm.onsubmit = buscarLivro;
            };
            buscarLivroForm.appendChild(voltarBtn);
        });
}

function adicionarCapa(livro) {
    const minhasLeituras = document.getElementById('minhasLeituras');
    const capa = livro.volumeInfo.imageLinks.thumbnail;

    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = capa;

    div.appendChild(img);
    div.onclick = () => {
        //ARMAZENAR OS DETALHES DO LIVRO NO LOCALSTORAGE
        localStorage.setItem('livroSelecionado', JSON.stringify({
            capa: livro.volumeInfo.imageLinks.thumbnail,
            titulo: livro.volumeInfo.title,
            autor: livro.volumeInfo.authors?.join(', '),
            paginas: livro.volumeInfo.pageCount
        }));
        window.location.href = 'meu-livro.html';

    };

    minhasLeituras.appendChild(div);
    document.getElementById('buscarLivroForm').style.display = 'none';
}
