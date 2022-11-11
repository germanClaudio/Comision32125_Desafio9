const { Router } = require('express')
const ApiProductosMock = require('../api/productos.js')

const apiProductos = new ApiProductosMock()
const router = Router()

router.post('/popular', async (req, res, next) => {
    const { cant } = req.params
    try {
        res.json(await apiProductos.popular(cant))
    } catch (error) {
        next(error)
    }
})

router.get('/historial', async (req, res, next) => {
    try {
        // res.status(200).json(await apiProductos.listarAll());
        res.render('historial', await apiProductos.getAllProducts())
    } catch (err) {
        next(err)
    }
 })

router.get('/', async (req, res, next) => {
    try {
        // res.status(200).json(await apiProductos.listarAll());
        res.render('index', await apiProductos.getAllProducts())
    } catch (err) {
        next(err)
    }
 })
 
 router.get('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.getById(req.params.id))
    } catch (err) {
        next(err)
    }
 })
 

 router.post('/', async (req, res, next) => {
    try {
        res.json(await apiProductos.createProduct(req.body))
    } catch (err) {
        next(err)
    }
 })
 
//  router.put('/:id', async (req, res, next) => {
//     try {
//         res.json(await apiProductos.actualizar({ ...req.body, id: req.params.id }))
//     } catch (err) {
//         next(err)
//     }
//  })
 

 router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.deleteProduct(req.params.id))
    } catch (err) {
        next(err)
    }
 })
 

 router.use((err, req, res, next) => {
    const erroresNoEncontrado = [
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al borrar: elemento no encontrado'
    ]
 
    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ message: err.message })
 })
 
 
 module.exports = router