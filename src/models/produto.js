class Produto {

    constructor() {
        this.principais = {
            cafe: 3.00,
            suco: 6.20,
            sanduiche: 6.50,
            salgado: 7.25,
        };

        this.combos = {
            combo1: 9.50,
            combo2: 7.50,
        };

        this.extras = {
            chantily: 1.50,
            queijo: 2.00,
        };
    }
}

module.exports = { Produto };