const { Produto } = require("./models/produto.js");
const { FormaPagamento } = require("./models/forma-de-pagamento.js");
const { ExtrasEspecificos } = require("./models/extras-especificos.js");
const { MensagensDeErro } = require("./exceptions/mensagens-de-erro.js");

class CaixaDaLanchonete {

    constructor() {
        this.produtos = new Produto();
        this.formasDePagamento = new FormaPagamento();
        this.extrasEspecificos = new ExtrasEspecificos();
        this.errors = new MensagensDeErro();
    }

    calcularValorDaCompra(formaDePagamento, itens) {

        if(!this.formasDePagamento.validaFormaDePagamento(formaDePagamento))
            return this.errors.formaDePagamento;

        if(itens.length == 0)
            return this.errors.itensSize;

        let valorTotal = 0;
        const quantidadeItens = {};
        for (const itemInfo of itens) {

            const [codigoItem, quantidade] = itemInfo.split(",");
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
                if(!this.extrasEspecificos.validaExtras(quantidadeItens, codigoItem))
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

    validaQuantidadeItem(quantidade){
        if (!quantidade || quantidade <= 0) 
            return false;
        return true;
    }

    formatarValorTotal(valor) {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }
}

module.exports = { CaixaDaLanchonete };