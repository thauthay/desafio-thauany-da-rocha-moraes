const { Produto } = require("./models/produto.js");
const { MensagensDeErro } = require("./exceptions/mensagens-de-erro.js");

class CaixaDaLanchonete {

    constructor() {
        this.produtos = new Produto();

        this.formasDePagamento = {
            dinheiro: 0.95,
            credito: 1.03,
            debito: 1.00,
        };

        this.extraValidations = {
            chantily: { requires: 'cafe' },
            queijo: { requires: 'sanduiche' }
        };

        this.itensPrincipais = new Set(Object.keys(this.produtos.principais));
        this.errors = new MensagensDeErro();
    }

    calcularValorDaCompra(formaDePagamento, itens) {

        if(!this.validaFormaDePagamento(formaDePagamento))
            return this.errors.formaDePagamento;

        if(itens.length == 0)
            return this.errors.itensSize;

        let valorTotal = 0;
        const quantidadeItens = {};

        for (const itemInfo of itens) {

            const [codigoItem, quantidadeItem] = itemInfo.split(",");
            const quantidade = parseInt(quantidadeItem);
            if(!this.validaQuantidadeItem(quantidade)){

                if(formaDePagamento == 'credito')
                    return this.errors.itemInvalido;
                else
                    return this.errors.quantidadeInvalida;
            }

            if (this.produtos.principais[codigoItem]) 
                valorTotal += this.produtos.principais[codigoItem] * quantidade;
             else if (this.produtos.combos[codigoItem]) 
                valorTotal += this.produtos.combos[codigoItem] * quantidade;
             else if (this.produtos.extras[codigoItem]) {
                if(!this.validaExtras(quantidadeItens, codigoItem))
                    return this.errors.itemExtra;
                valorTotal += this.produtos.extras[codigoItem] * quantidade;
            } else 
                return this.errors.itemInvalido;

            if (!quantidadeItens[codigoItem]) 
                quantidadeItens[codigoItem] = 0;

            quantidadeItens[codigoItem] += quantidade;
        }
        valorTotal *= this.formasDePagamento[formaDePagamento];

        return this.formatarValorTotal(valorTotal);
    }

    validaExtras(quantidadeItens, codigoItem){
        if (this.extraValidations[codigoItem]) {
            const requiredcodigoItem = this.extraValidations[codigoItem].requires;
            if (!quantidadeItens[requiredcodigoItem]) 
                return false;
        }
        return true;
    }

    validaQuantidadeItem(quantidade){
        if (!quantidade || quantidade <= 0) 
            return false;
        return true;
    }

    validaFormaDePagamento(formaDePagamento){
        if (!this.formasDePagamento.hasOwnProperty(formaDePagamento))
            return false;
        return true;
    }

    formatarValorTotal(valor) {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }
}

module.exports = { CaixaDaLanchonete };