const prompt = require("prompt-sync")()

//funções de gerenciamento
function addprod() {
    produtos.push({
        id: prompt("Digite o ID do produto: ").toUpperCase(),
        nome: prompt("Digite o nome do produto: ").toUpperCase(),
        preco: parseFloat(prompt("Digite o preço do produto: ")),
        quantidade: parseInt(prompt("Digite a quantidade de unidades deste produto: "))
    })
    estoque.push({
        nome: produtos[produtos.length - 1].nome,
        preco: produtos[produtos.length - 1].preco,
        numeracao: produtos.length
    })
    return "Produto cadastrado com sucesso!"
}

function removeprod() {
    console.log("Lista dos produtos")
    produtos.forEach((item, index) => {
        console.log(`
            ${index + 1} - ${item.nome}
        `)
    })
    removepergunta = parseInt(prompt("Digite o número do produto que será removido: "))
    produtos.splice((removepergunta - 1), 1)
    estoque.splice((removepergunta - 1), 1)
    return "Produto removido com sucesso!"
}

function edit() {
    console.log("Lista dos produtos")
    produtos.forEach((item, index) => {
        console.log(`
            ${index + 1} - ${item.nome}
        `)
    })
    console.log("Escolha o item a ser editado")
    editpergunta = parseInt(prompt(""))

    for (let i = 0; i <= editpergunta; i++) {
        if (i == editpergunta) {
            perguntaalterar = parseInt(prompt("Oque será editado: \n1 - id\n2 - nome \n3 - preco \n4 - quantidade"))
            do {
                switch (perguntaalterar) {
                    case 1:
                        produtos[i - 1].id = prompt("Digite o novo ID do produto: ").toUpperCase()
                        break
                    case 2:
                        produtos[i - 1].nome = prompt("Digite o novo nome do produto: ").toUpperCase()
                        estoque[i - 1].nome = produtos[i - 1].nome
                        break
                    case 3:
                        produtos[i - 1].preco = parseFloat(prompt("Digite o novo preço do produto: "))
                        estoque[i - 1].preco = produtos[i - 1].preco
                        break
                    case 4:
                        produtos[i - 1].quantidade = parseInt(prompt("Digite a nova quantidade do produto: "))
                        break
                }
                perguntacontinuar = prompt("Deseja editar novamente? s/n").toLowerCase()
            } while (perguntacontinuar == "s")
        }
    }
}

//funções do caixa
function caixa() {
    let lucroTotalDia = 0
    let quantidadeTotalVendida = 0

    do {
        perguntacaixa = prompt("Digite o nome ou ID do produto: ").toUpperCase()

        let produtoEncontrado = produtos.find(produto =>
            produto.nome === perguntacaixa || produto.id === perguntacaixa
        )

        if (!produtoEncontrado) {
            console.log("Este produto não está cadastrado!")
        } else {
            let quantidadeVenda = parseInt(prompt("Quantidade: "))

            if (quantidadeVenda > produtoEncontrado.quantidade) {
                console.log("Quantidade insuficiente!")
            } else {
                produtoEncontrado.quantidade -= quantidadeVenda

                vendas.push({
                    nome: produtoEncontrado.nome,
                    quantidade: quantidadeVenda,
                    total: produtoEncontrado.preco * quantidadeVenda
                })

                lucroTotalDia += produtoEncontrado.preco * quantidadeVenda
                quantidadeTotalVendida += quantidadeVenda
            }
        }

        perguntacontinuar = prompt("Mais algum produto? s/n").toLowerCase()
    } while (perguntacontinuar == "s")

    turnos.push({
        vendasRealizadas: vendas.length,
        itensVendidos: quantidadeTotalVendida,
        lucroTotal: lucroTotalDia
    })

    vendas = []
    console.log("Venda finalizada.")
}

//menu principal
function menu() {
    let opcao = ""

    while (opcao !== "3") {
        console.log(`
1 - Gerenciamento
2 - Caixa
3 - Sair
        `)

        opcao = prompt("Escolha: ")

        if (opcao == "1") {
            submenuGerenciamento()
        }
        if (opcao == "2") {
            caixa()
        }
    }
}

function submenuGerenciamento() {
    let opcao = ""

    while (opcao !== "4") {
        console.log(`
1 - Adicionar produto
2 - Remover produto
3 - Editar produto
4 - Voltar
        `)

        opcao = prompt("Escolha: ")

        if (opcao == "1") console.log(addprod())
        if (opcao == "2") console.log(removeprod())
        if (opcao == "3") edit()
    }
}


//array
let produtos = []
let estoque = []
let vendas = []
let turnos = []

//variaveis
let removepergunta
let editpergunta
let perguntacontinuar
let perguntaalterar
let perguntacaixa

menu()