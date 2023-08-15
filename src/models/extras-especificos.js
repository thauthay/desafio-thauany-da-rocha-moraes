class ExtrasEspecificos {
    constructor() {
        this.extrasValidations = {
            chantily: { requires: 'cafe' },
            queijo: { requires: 'sanduiche' }
        }
    }

    validaExtras(quantidadeItens, codigoItem){
        
        if (this.extrasValidations[codigoItem]) {
            const requiredcodigoItem = this.extrasValidations[codigoItem].requires;
            if (!quantidadeItens[requiredcodigoItem]) 
                return false;
        }
        return true;
    }
}

module.exports = { ExtrasEspecificos };