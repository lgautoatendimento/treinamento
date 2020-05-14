var minhaVariavel = "thiago;gonzaga"

function minhaFuncao() { }
var meuArray = minhaVariavel.split(';');

minhaVariavel = minhaFuncao;
var meuArray = minhaVariavel.split(';'); // erro

var retornoOutroArray = meuArray.filter()

var array = [] // array
var objeto = {} //


var obj = {
    nome: '',
    sobrenome: ''
};

var strAtributos = Object.keys(obj); // ['nome', 'sobrenome']

for (var item in obj) {
    var valorDoItem = obj[item]; // obj.nome ou obj.sobrenome
}

// Lista de Endereços

var meusEnderecos = [];

meusEnderecos.push({
    rua: 'Rua 1',
    bairro: 'Bairro 1'
})

meusEnderecos.push({
    rua: 'Rua 2',
    bairro: 'Bairro 2'
})

var enderecos = {
    'Endereco[0].rua': 'Rua 1',
    'Endereco[0].bairro': 'Bairro 1',
    'Endereco[1].rua': 'Rua 2',
    'Endereco[1].bairro': 'Bairro 2'
}

// <input name="Endereco[0].rua">

