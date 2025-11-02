import { arrayTotais, arraySelecionados, arrayIds, listaDeCompras } from "./variables.js"
let quantidadeDeSelecionados = 0

const confirmarCompra = document.querySelector('.btn-confirmar-compra')
confirmarCompra.addEventListener("click", (e) => {
    let telaDaCompra = document.querySelector('.compra-final')

    telaDaCompra.classList.remove('ocultar-botao')
    telaDaCompra.classList.add('compra-final')

    let compra = listaDeCompras.filter((produtos) => {
        return produtos != 0
    })



    const totalCompra = compra.reduce((acumulador, totalDeCadaProduto) => {
        return acumulador + totalDeCadaProduto.total
    }, 0)
    console.log(totalCompra)
    let lisaDeCompras = document.querySelector('.total-da-compra')
    
    let informacoesDaCompra = document.querySelector('.informacoes-da-compra')
    
    if (totalCompra != 0) {
        lisaDeCompras.innerHTML = `<p> <span>Order Total</span> $${totalCompra}</p>`
        for (let i = 0; i <= compra.length; i++) {
            informacoesDaCompra.innerHTML += `
        <div class="por-compra">
            <img style="width: 50px;" src="${compra[i].imagem}" alt="Essa é a imagem do seu produto">
            <div class="informacoes">
                <p>${compra[i].nome}</p>
                <p><span>${compra[i].quantidade}x</span><span>$${compra[i].valorUnitario}</span> <span>$${compra[i].total}</span></p>
            </div>
        </div>    
        `
        }
    } else {
        informacoesDaCompra.innerHTML = `Carrinho está vazio!`
    }


})

window.incrementORDecrement = function (incrementOrDecrement, i, idProduto) {
    const totalSelecao = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade']`)
    const nomeProduto = document.querySelector(`div[id='${idProduto[0].id}'] p[class='nome-produto-selecionado']`)

    const urlImagem = document.querySelector(`section[id='${idProduto[0].id}'] div[class='imagem'] img`)
    let quantidadeNoBotao = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem'] div[class='btn-quantidade'] p[class='quantidade-produtos']`)
    let valor = ''

    if (incrementOrDecrement === "+") {
        let valorString = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade'] span`)
        valor = parseFloat(valorString.textContent)
        arrayTotais[i] += valor
        arraySelecionados[i] += 1
        arrayTotais.splice(i, 1, arrayTotais[i])
        if (arrayTotais[i] >= 0) {
            totalSelecao.innerHTML = `${arraySelecionados[i]}x @$<span>${valor.toFixed(2)}</span> <span class="total-selecao">$${arrayTotais[i].toFixed(2)}</span>`
            quantidadeNoBotao.innerHTML = `${arraySelecionados[i]}`
        }

    } else if (incrementOrDecrement === '-') {
        let valorString = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade'] span`)
        valor = parseFloat(valorString.textContent)

        if (arrayTotais[i] >= 0) {

            totalSelecao.innerHTML = `${arraySelecionados[i]}x $<span>${valor.toFixed(2)}</span> <span class="total-selecao">$${arrayTotais[i].toFixed(2)}</span>`
            quantidadeNoBotao.innerHTML = `${arraySelecionados[i]}`
            arrayTotais[i] -= valor
            arraySelecionados[i] -= 1
            arrayTotais.splice(i, 1, arrayTotais[i])
        }
    }

    if (idProduto[0].id !== arrayIds[i]) {
        arrayIds[i] = idProduto[0].id
        quantidadeDeSelecionados += 1
        let totalDeProdutos = document.querySelector("section[class='carrinho'] p[class='titulo-carrinho'] span")
        totalDeProdutos.innerHTML = `${quantidadeDeSelecionados}`
    }

    // stotal de todos os produtos
    const total = arrayTotais.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual
    }, 0)

    if (total >= 0) {
        let totalHTML = document.querySelector("div[class='total-da-compra'] p[class='valor-pago'] span")
        totalHTML.innerHTML = `$${total.toFixed(2)}`
    } else {
        let totalHTML = document.querySelector("div[class='total-da-compra'] p[class='valor-pago'] span")
        totalHTML.innerHTML = `$0`
    }

    let idetificadores = listaDeCompras.map(function (ident) {
        return ident.identificador;
    })
    const indentificadorExiste = idetificadores.includes(idProduto[0].id)
    if (indentificadorExiste === false) {
        listaDeCompras.splice(i, 1, {
            identificador: arrayIds[i],
            imagem: urlImagem.src,
            nome: nomeProduto.textContent,
            quantidade: arraySelecionados[i],
            valorUnitario: valor,
            total: arrayTotais[i]
        })
    } else {
        console.log("Estamos aqui dev!")
        listaDeCompras.splice(i, 1, {
            identificador: arrayIds[i],
            imagem: urlImagem.src,
            nome: nomeProduto.textContent,
            quantidade: arraySelecionados[i],
            valorUnitario: valor,
            total: arrayTotais[i]
        })
    }
}

const produto = document.getElementsByClassName('produto')

for (let i = 0; i < produto.length; i++) {
    let trocaDeBotao = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem']`)
    let imagem = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem'] img`)
    const btnAdd = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem'] button[class='btn-add']`)
    const nome = document.querySelector(`section[id='${produto[i].id}'] div[class='informacoes'] p[class='nome-produto']`)
    const valor = document.querySelector(`section[id='${produto[i].id}'] div[class='informacoes'] p[class='valor'] span`)
    let carrinho = document.querySelector(".escolhidos")

    btnAdd.addEventListener('click', (e) => {
        if (btnAdd.name === produto[i].id) {
            btnAdd.classList.remove('btn-add')
            btnAdd.classList.add('ocultar-botao')
            trocaDeBotao.innerHTML = `
                    <img src="${imagem.src}" alt="${imagem.alt}">
                    <div class="btn-quantidade">
                        <p onclick="incrementORDecrement('-', ${i}, ${produto[i].id})" class='operador'>-</p>
                        <p class='quantidade-produtos'>0</p>
                        <p onclick="incrementORDecrement('+', ${i}, ${produto[i].id})" class='operador'>+</p>
                    </div>
                    `
        }

        carrinho.innerHTML += `
                    <div class="produtos-selecionados">
                        <div class="borda"></div>
                        <div class="produto-no-carrinho">
                        <div id="${produto[i].id}" class="dados-da-selecao">
                            <p class="nome-produto-selecionado">${nome.textContent}</p>
                            <p class="quantidade"> 0x @$<span>${valor.textContent}</span> <span class="total-selecao">$0</span>
                            </p>
                        
                        </div>
                        <div class="btn-deletar-selecao">
                            <img src="./assets/images/icon-remove-item.svg" alt="">
                        </div>
                        </div>
                        
                    </div>
                `
    })
}