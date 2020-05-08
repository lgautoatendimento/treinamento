define('workflow/lg.ferias.controller', [
    'jquery',
    'aaControls/lg.aa.globalizacao',
    'aaControls/lg.aa.header',
    'aaControls/lg.aa.toolbar',
    'aaControls/lg.aa.selecaoColaborador',
    'aaControls/lg.aa.validator',
    'aaControls/lg.aa.utils',
    'aaControls/lg.aa.block',
    'aaControls/lg.aa.messageBox',
    'workflow/lg.mock',
    'aaControls/lg.aa.switch',
    'aaControls/lg.aa.datepicker'
], function ($, globalizacao, Header, Toolbar, SelecaoColaborador, Validator, utils, block, messageBox, mock) {

    // Adicionando a globalização 'Eu' para o componente de seleção de colaboradores
    globalizacao.adicione(29074, 'Eu');

    var Controller = function ($el) {
        this.$el = $el;
        this._inicializar();
    };

    Controller.prototype = {

        _inicializar: function () {
            this.$elHeader = this.$el.find('#header');
            this.$elToolbar = this.$el.find('#toolbar');

            this._prepararComponentes();
        },

        _prepararComponentes: function () {
            var _this = this;

            mock.iniciarMocks();

            this.headerController = new Header(this.$elHeader, {
                nome: 'Thiago G. Gonzaga',
                primeiraInformacao: 'Desenvolvedor na LG lugar de gente',
                segundaInformacao: 'Gestor: <strong>Farley Silva</strong>',
                email: 'thiago.gonzaga@lg.com.br',
                telefone: '62 3333 3333 / 62 9999 9999',
                facebook: 'https://www.facebook.com',
                twitter: 'https://www.twitter.com',
                linkedin: 'https://www.linkedin.com'
            });

            this.toolbarController = new Toolbar(this.$elToolbar, {
                descricao: 'Férias',
                icone: 'lg-aa-icon--ferias',
                botoes: [{
                    id: 'btnSelecaoColaborador',
                    icone: 'fa fa-users'
                }]
            });

            this.selecaoColaborador = new SelecaoColaborador($('#selecaoColaborador'), {
                $elementoReferencia: $('#btnSelecaoColaborador'),
                url: './colaboradores.json',
                codigoEmpresa: 1,
                matricula: 1,
                onChange: function(dados) {
                    console.log(dados);
                    if(dados.nomeCompleto) {
                        dados.nome = dados.nomeCompleto;
                    }

                    dados.pequeno = false;

                    _this.headerController.atualizarDados(dados);
                }
            });

            this.validator = new Validator($('#formFerias'), {
                rules: {
                    dataInicio: {
                        required: true
                    },
                    diasGozo: {
                        required: true,
                        digits: true,
                        min: 10,
                        max: 30
                    },
                    diasAbono: {
                        required: true,
                        digits: true,
                        range: [5, 10]
                    }
                },
                submitHandler: function (form, e) {
                    e.preventDefault();
                    
                    block.bloquear(0);
                    $.post('ferias/salvar', utils.formToJson(form)).done(function(data) {
                        _this.validator.verifiqueRespostaValidacao(data);
                        
                        if(!data.possuiInconsistencia && !data.possuiAlertas) {
                            messageBox.sucesso('SUCESSO', 'Parabéns seus formulário não possui Inconsistências/Alertas.')
                        }

                        block.desbloquear();
                    });
                }
            });

            this.$el.find('.lg-aa-datepicker').lgDatepicker();

            this.$el.find('#switchDecimoTerceiroSalario').lgSwitch();
            this.$el.find('#switchAbonoPecuniario').lgSwitch({ toggle: true });
            this.$el.find('#switchFeriasParceladas').lgSwitch({ habilitado: false });

            this.switchTipoLancamento = this.$el.find('#switchTipoLancamento').lgSwitch({
                change: function (valor, $el) {
                    mock.adicionarLinhas(_this.$el.find('#tableLancamentos'), _this._obtenhaQuantidadeDeLinhasLancamentos($el));
                }
            });

            mock.adicionarLinhas(_this.$el.find('#tableLancamentos'), this._obtenhaQuantidadeDeLinhasLancamentos($('[name="tipoLancamento"]:checked')));
        },

        _obtenhaQuantidadeDeLinhasLancamentos: function ($el) {
            return $el.parent().find('.badge').text();
        }
    };

    return Controller;
});