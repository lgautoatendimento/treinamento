define("treinamento/modulo1", [
    "jquery",
    "aaControls/lg.aa.header",
    "aaControls/lg.aa.toolbar",
    "aaControls/lg.aa.datepicker",
    "aaControls/lg.aa.switch"
], function ($, Header, Toolbar) {

    var Controller = function ($el) {
        this.$el = $el;

        this._inicialize();
    }

    Controller.prototype = {

        _inicialize: function () {
            var controllerHeader = new Header(this.$el.find("#header"), {
                nome: "Franziska Hoover",
                primeiraInformacao: "Gerente Administrativo em LG lugar de gente",
                segundaInformacao:
                    'Gestor: <strong class="lg-aa-texto--primario">Danilo Rocha</strong>',
                email: "franziska.hoover@lg.com.br",
                telefone: "11 3333 3333 / 11 9999 9999"
            });
            console.log(controllerHeader.obterDados());

            var controllerToolbar = new Toolbar(this.$el.find("#toolbar"), {
                id: "minhaBarraFerramentas",
                descricao: "Férias",
                icone: "lg-aa-icon--ferias",
                botoes: [{
                    href: "https://www.lg.com.br",
                    styleClass: "lg-aa-botao--secundario",
                    icone: "fa fa-users"
                }]
            });

            this.$el.find('.lg-aa-datepicker').lgDatepicker();

            this.$el.find('#switchFeriasParceladas').lgSwitch({ habilitado: false });
            this.$el.find('#switchDecimoTerceiroSalario').lgSwitch();
            this.$el.find('#switchAbonoPecuniario').lgSwitch({ toggle: true });
        }
    };

    return Controller;
});
