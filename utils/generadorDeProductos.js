const {faker} = require('@faker-js/faker')
faker.locale = 'es'

const {commerce, image} = faker

function generarProducto() {
 return {
   title: commerce.productName(),
  //description: commerce.productDescription(),
   price: parseInt(commerce.price(50, 200, 0)),
   thumbnail: `${image.avatar()}`  //image.avatar(),  NOTA: se coloco abstract(), pero el antivirus lo rechazaba
 }
}

module.exports = { generarProducto }
