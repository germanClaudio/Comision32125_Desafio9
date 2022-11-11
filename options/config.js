const options = {
    mysql: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'products'
    }

  },
  filePath: {
    path: './DB/productos.json',
    pathMsg: './DB/messages.json'
  },
  sqlite: {
    client: 'sqlite3',
    connection: {
    filePath: './DB/messages.json'
    },
    useNullAsDefault: true
}
}
  module.exports = {
    options
  }