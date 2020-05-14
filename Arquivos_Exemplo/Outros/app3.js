var Controller = function () {
    this.nome = "Thiago";
}

Controller.prototype = {
    imprima: function () {
        console.log(this.nome);
    }
}