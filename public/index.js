const socket = io.connect()
const { normalizar, denormalize, schema } = require('normalizr')

// ----------  Messages ----------------
socket.on('mensajesAll', async (data) => {
    //console.log('Data mensaje: ' + data )
    render( await data)
})

const addMessage = () => {
    const author = document.getElementById('author').value
    const text = document.getElementById('texto').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const edad = document.getElementById('edad').value
    const alias = document.getElementById('alias').value
    const avatar = document.getElementById('avatar').value
    
    socket.emit('newMensaje', { author, nombre, apellido, edad, alias, avatar, text })

    return false
}

const render = (data) => {
    console.log('Render msg..... ' +  JSON.stringify(data))
    const date = new Date().toLocaleString('en-GB')
    
    const html = data.map((element) => {
        console.log('Dentro del html mensajes '+ [...data])
        return (`<div class="d-block mx-auto my-1 p-1">
                    <strong class="text-secondary"> Mensaje-> </strong>
                    <strong class="fw-bold text-primary">${element.author.id}</strong>:
                    <e id="colorBrown" style="color:brown;">${date} </e>: 
                    <em id="colorGreen" style="color:MediumSeaGreen;">${element.text}</em>
                    <img class="img-fluid rounded-circle" alt="avatar" src='${element.author.avatar}' width="60" height="60">
               </div>`)
    }).join(" ")

    document.getElementById('mostrarMensajes').innerHTML = html

    // document.getElementById('author').value = ""
    document.getElementById('texto').value = ""
}


// --------------  Products ----------------
socket.on('productsAll', async (arrProd) => {
    // console.log(arrProd)
    //socket.emit('respuesta', { socketID: data.id, mensaje: data } )
    renderProduct(await arrProd) //await
})

const addProduct = () => {
    const title = document.getElementById('title').value
    const price = Number(document.getElementById('price').value)
    const thumbnail = document.getElementById('thumbnail').value
    // console.log(title, price, thumbnail)
    socket.emit('newProducto', { title, price, thumbnail })

    return false
}

const renderProduct = (arrProd) => {
    // console.log('Render..... ', ...arrProd )
    // const arrayProd = arrProd  //
    const html = arrProd.map((element) => {
        return (`<tr>
                    <th scope="row" class="text-center"><strong>${element.id}</strong></th>
                    <td class="text-center">${element.title}</td>
                    <td class="text-center">$${element.price}</td>
                    <td class="text-center"><img class="img-fluid rounded" alt="Product Image" src='${element.thumbnail}' width="100" height="80"></td>
                    <td class="text-center">${element.thumbnail}</td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProductos').innerHTML = html

    const htmlProdList = 
        ( `<caption id="capProdList">Total Product List ${arrProd.length}</caption>`)

    document.getElementById('capProdList').innerHTML = htmlProdList    

    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""
}