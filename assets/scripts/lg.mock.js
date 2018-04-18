define('workflow/lg.mock', [
    'jquery',
    'cdn/moment/2.18.1/js/moment-with-locales.min',
    'assets/scripts/jquery.mockajax'
], function ($, moment, mockAjax) {

    function _criarLinhas($table, qtdLinhas) {
        var $body = $table.find('tbody');
        $body.children().remove();
        $body.append($('<tr />'));

        for (var i = 0; i < qtdLinhas; i++) {
            var $linha = $('<tr />');
            var dataInicio = _obtenhaData(i);
            var dataFim = _obtenhaData((i === 0 ? 1 : i - 1), i === 0);
            var dataPagamento = moment().subtract(i, 'years').subtract(30, 'days').format('DD/MM/YYYY');

            $linha.append($('<td class="text-center" />').text(dataInicio + ' a ' + dataFim));
            $linha.append($('<td class="text-center" />').text(dataInicio));
            $linha.append($('<td class="text-center" />').text(dataFim));
            $linha.append($('<td class="text-center" />').text('1 de 1'));
            $linha.append($('<td class="text-center" />').text('30'));
            $linha.append($('<td class="text-center" />').text('Não'));
            $linha.append($('<td class="text-center" />').text(dataPagamento));
            $linha.append($('<td class="text-center" />').text('Não'));
            $linha.append($('<td class="text-center" />').text('Normal'));

            $body.append($linha);
        }
    }

    function _obtenhaData(qtdAno, adicionar) {
        var data = undefined;

        if (adicionar) {
            data = moment().add(qtdAno, 'years');
        } else {
            data = moment().subtract(qtdAno, 'years');
        }

        return data.format('DD/MM/YYYY');
    }

    function _criarMockColaboradores() {
        $.mockjax({
            url: './colaboradores.json',
            type: 'POST',
            responseText: [
                {
                    "matricula": 1,
                    "empresa": 1,
                    "colaboradorLogado": true,
                    "nome": "Thiago G. Gonzaga",
                    "primeiraInformacao": "Desenvolvedor na LG lugar de gente",
                    "segundaInformacao": "Gestor: <strong>Farley Silva</strong>",
                    "email": "thiago.gonzaga@lg.com.br",
                    "telefone": "62 3333 3333 / 62 9999 9999",
                    "facebook": "https://www.facebook.com",
                    "twitter": "https://www.twitter.com",
                    "linkedin": "https://www.linkedin.com"
                },
                {
                    "matricula": 2,
                    "empresa": 1,
                    "nome": "Richards Tyler",
                    "primeiraInformacao": "Desenvolvedor na LG lugar de gente",
                    "segundaInformacao": "Gestor: <strong>Alberto Soares</strong>"
                },
                {
                    "matricula": 3,
                    "empresa": 1,
                    "nome": "Yates Whitaker",
                    "primeiraInformacao": "Desenvolvedor na LG lugar de gente",
                    "segundaInformacao": "Gestor: <strong>Alberto Soares</strong>"
                },
                {
                    "matricula": 4,
                    "empresa": 1,
                    "nome": "Cheri Morse",
                    "primeiraInformacao": "Desenvolvedor na LG lugar de gente",
                    "segundaInformacao": "Gestor: <strong>Alberto Soares</strong>"
                },
                {
                    "matricula": 5,
                    "empresa": 1,
                    "nome": "Zimmerman Martinez",
                    "primeiraInformacao": "Desenvolvedor na LG lugar de gente",
                    "segundaInformacao": "Gestor: <strong>Alberto Soares</strong>"
                }
            ]
        });
    }

    function _criarMockFormulario() {
        $.mockjax({
            url: 'ferias/salvar',
            type: 'POST',
            responseTime: 1000,
            response: function (request) {
                var retorno = {
                    inconsistencias: [],
                    alertas: []
                };

                var dados = request.data;

                // Regra total de dias de férias
                var totalDiasFerias = (dados.diasAbono ? parseInt(dados.diasAbono) : 0) + parseInt(dados.diasGozo);

                if (totalDiasFerias > 30) {
                    retorno.inconsistencias.push({
                        propriedadeValidada: 'diasGozo',
                        mensagem: 'A soma dos dias de Abono + Gozo não deve ultrapassar 30 dias.'
                    });

                    retorno.inconsistencias.push({
                        propriedadeValidada: 'diasAbono',
                        mensagem: 'A soma dos dias de Abono + Gozo não deve ultrapassar 30 dias.'
                    });
                } else if (totalDiasFerias < 30) {

                    retorno.alertas.push({
                        propriedadeValidada: 'diasGozo',
                        mensagem: 'Ainda resta(m) ' + (30 - totalDiasFerias) + ' dia(s) de direito a férias pendente.'
                    });
                }

                // Regra para data de início
                var dataInformada = moment(dados.dataInicio, 'DD/MM/YYYY');
                var dataMinima = moment().add(31, 'days');

                if (dataInformada.isBefore(dataMinima)) {
                    retorno.alertas.push({
                        propriedadeValidada: 'txtDatepickerDataInicio',
                        mensagem: 'A data de início é inferior aos 30 dias que antecedem as férias.'
                    });
                }

                retorno.possuiInconsistencia = retorno.inconsistencias.length > 0;
                retorno.possuiAlertas = retorno.alertas.length > 0;

                this.responseText = retorno;
            }
        });
    }

    return {
        adicionarLinhas: _criarLinhas,
        iniciarMocks: function () {
            _criarMockColaboradores();
            _criarMockFormulario();
        }
    }
});