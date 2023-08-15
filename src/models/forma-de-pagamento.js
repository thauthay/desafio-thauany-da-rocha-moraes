class FormaPagamento {

    constructor() {
        this.dinheiro = 0.95;
        this.credito = 1.03;
        this.debito = 1.00;
    }

    validaFormaDePagamento(formaDePagamento){
        if (!this.hasOwnProperty(formaDePagamento))
            return false;
        return true;
    }
}

module.exports = { FormaPagamento };