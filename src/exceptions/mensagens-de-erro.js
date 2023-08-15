class MensagensDeErro {

    constructor() {
        this.formaDePagamento = "Forma de pagamento inválida!";
        this.itensSize = "Não há itens no carrinho de compra!";
        this.quantidadeInvalida = "Quantidade inválida!";
        this.itemExtra = "Item extra não pode ser pedido sem o principal";
        this.itemInvalido = "Item inválido!";
    }
}

module.exports = { MensagensDeErro };