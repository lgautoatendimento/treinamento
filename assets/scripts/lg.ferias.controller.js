define('workflow/lg.ferias.controller', [
    'aaControls/jquery/3.2.1',
    'aaControls/lg.aa.header',
    'aaControls/lg.aa.toolbar'
], function($, Header, Toolbar) {

    var Controller = function($el) {
        this.$el = $el;
        this._inicializar();
    };

    Controller.prototype = {

        _inicializar: function() {

            this.header = new Header(this.$el.find('#header'), {
                foto: 'http://img.olx.com.br/images/27/271806035773498.jpg',
                nome: 'Thiago G. Gonzaga',
                primeiraInformacao: 'Desenvolver na LG lugar de gente',
                segundaInformacao: 'Gestor: <strong class="lg-aa-texto--primario">Farley Silva</strong>',
                email: 'thiago.gonzaga@lg.com.br',
                telefone: '11 3333 3333 / 11 9999 9999',
                facebook: 'https://www.facebook.com',
                twitter: 'https://www.twitter.com',
                linkedin: 'https://www.linkedin.com'
            });

            this.toolbar = new Toolbar(this.$el.find('#toolbar'), {
               descricao: 'Férias',
               icone: 'lg-aa-icon--ferias',
               botoes: [{
                   id: 'btnSelecaoColaborador',
                   icone: 'fa fa-users'
               }]
            });
        }
    };

    return Controller;
});