module.exports = {
  data: function () {
    return {
      excel: {
        file: ''
      },
      messages: [],
      creating: false
    }
  },

  methods: {
    onFileChange: function(e){
      var that = this;
      this.processing = true;
      var files = document.getElementById('nameInput').files;
      var FR = new FileReader();
      FR.onload = function(e) {
        that.excel.file = e.target.result;
      };
      FR.readAsDataURL( files[0] );
    },
    uploadExcel: function (e) {
      e.preventDefault()
      var that = this
      that.creating = true
      client({path: 'excel', entity: this.excel}).then(
          function (response, status) {
            that.messages = [ {type: 'success', message: 'Excel uploaded'} ]
            Vue.nextTick(function () {
              document.getElementById('nameInput').focus()
            })
            that.creating = false
          },
          function (response) {
            that.messages = []
              that.messages.push({type: 'danger', message: response.entity})
              that.creating = false
          }
      )
    }
  }
}
