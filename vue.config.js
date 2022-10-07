const { defineConfig } = require('@vue/cli-service')
module.exports = {

  service_config: {
    "vkontakte":{
      'code':'',
      'url_token':'https://oauth.vk.com/access_token',
      'url_user_info':'https://api.vk.com/method/users.get?fields=uid,first_name,last_name,nickname,screen_name,sex,bdate,city,country,timezone,photo',
      'client_id':'51428350',
      'client_secret':'QIjLmhKbH14AsJYgL2mW',
      'redirect_uri':"http://localhost:8080/"
    }
  },

  devServer: {
    proxy: 'http://localhost:8080'
  }
}
