let arrayTotais = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let arraySelecionados = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let arrayIds = []
let quantidadeDeSelecionados = 0
const confirmarCompra = document.querySelector('.btn-confirmar-compra')
confirmarCompra.addEventListener("click", (e)=>{
    window.alert(innerWidth = `<p>sdfsdf</p>sfsdsd`)

})


window.incrementORDecrement = function(incrementOrDecrement, i, idProduto){
    const totalSelecao = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade']`)
    if(incrementOrDecrement === "+"){
        let valorString = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade'] span`)
        const valor = parseFloat(valorString.textContent)
        arrayTotais[i] += valor
        arraySelecionados[i] += 1
        arrayTotais.splice(i,1, arrayTotais[i])
        if(arrayTotais[i] >= 0){
            totalSelecao.innerHTML = `${arraySelecionados[i]}x @$<span>${valor}</span> <span class="total-selecao">$${arrayTotais[i]}</span>` 
            
        }

    } else if(incrementOrDecrement === '-') {
        let valorString = document.querySelector(`div[id='${idProduto[0].id}'] p[class='quantidade'] span`)
        const valor = parseFloat(valorString.textContent)
        
        if(arrayTotais[i] >= 0){
            
            totalSelecao.innerHTML = `${arraySelecionados[i]}x $<span>${valor}</span> <span class="total-selecao">$${arrayTotais[i]}</span>`
            arrayTotais[i] -= valor
            arraySelecionados[i] -= 1
            arrayTotais.splice(i,1, arrayTotais[i])
        }
    }

    if (idProduto[0].id !== arrayIds[i]){
        arrayIds[i] = idProduto[0].id
        quantidadeDeSelecionados += 1
        let totalDeProdutos = document.querySelector("section[class='carrinho'] p[class='titulo-carrinho'] span")
        totalDeProdutos.innerHTML = `${quantidadeDeSelecionados}`
        
        console.log(arrayIds)
        console.log(arrayIds[i])
        console.log(idProduto[0].id)
    }
    
    // stotal de todos os produtos
    const total = arrayTotais.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual
    }, 0)

    if(total >= 0){
        let totalHTML = document.querySelector("div[class='total-da-compra'] p[class='valor-pago'] span")
        totalHTML.innerHTML = `$${total}`
    } else {
        let totalHTML = document.querySelector("div[class='total-da-compra'] p[class='valor-pago'] span")
        totalHTML.innerHTML = `$0`
    }

    
}



const produto = document.getElementsByClassName('produto')
for(let i = 0; i < produto.length; i++ ){
    let trocaDeBotao = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem']`)
    let imagem = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem'] img`)
    const btnAdd = document.querySelector(`section[id='${produto[i].id}'] div[class='imagem'] button[class='btn-add']`)
    const nome =  document.querySelector(`section[id='${produto[i].id}'] div[class='informacoes'] p[class='nome-produto']`)
    const valor = document.querySelector(`section[id='${produto[i].id}'] div[class='informacoes'] p[class='valor'] span`)
    let carrinho = document.querySelector(".escolhidos")
    
    btnAdd.addEventListener('click', (e) => {
        if(btnAdd.name === produto[i].id){
            btnAdd.classList.remove('btn-add')
            btnAdd.classList.add('ocultar-botao')
            trocaDeBotao.innerHTML = `
                    <img src="${imagem.src}" alt="Imagem do waffle">
                    <div class="btn-quantidade">
                        <p onclick="incrementORDecrement('-', ${i}, ${produto[i].id})" class='operador'>-</p>
                        <p class='quantidade-produtos'>1</p>
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