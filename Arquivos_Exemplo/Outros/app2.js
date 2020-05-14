var Animal = function (nome, especie) {
    this.nome = nome;
    this.especie = especie;
}

Animal.prototype.imprima = function () {
    console.log(`${this.nome} - ${this.especie}`); // Não funciona no IE9, apenas curiosidade

    var _this = this;
    var self = this;

    var teste = function() {
        console.log(`Contexto da função: ${_this.nome} - ${self.especie}`);
    }

    teste();
}

var Cachorro = function (nome) {
    Animal.call(this, nome, 'Pitbull');
}

Cachorro.prototype = Object.create(Animal.prototype);
Cachorro.prototype.constructor = Cachorro;

var Vaca = function (nome) {
    Animal.call(this, nome, 'Holandesa');
}

Vaca.prototype = Object.create(Animal.prototype);
Vaca.prototype.constructor = Vaca;

Vaca.prototype.imprima = function () {
    Animal.prototype.imprima.call(this);
    console.log('Eu sou diferente!')
}