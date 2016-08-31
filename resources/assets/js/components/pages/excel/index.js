module.exports = {

    data: function () {
        return {
            excel: [],
            messages: []
        }
    },

    methods: {
        fetch: function (successHandler) {
            var that = this
            client({ path: '/excel' }).then(
                function (response) {
                    that.$set('excel', response.entity.data)
                    successHandler(response.entity.data)
                },
                function (response, status) {
                    that.messages = []
                    that.messages.push({type: 'danger', message: response.entity})
                    if (_.contains([401, 500], status)) {
                        that.$dispatch('userHasLoggedOut')
                    }
                }
            )
        }
    },
    route: {
        data: function (transition) {
            this.fetch(function (data) {
                transition.next({excel: data})
            })
        }
    }
}
