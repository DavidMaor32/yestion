const { getAllProducts, getProduct, createProduct } = require('../services/users')

module.exports = {
    ListUserNames: async (req, res) => {
        try {
            const products = await getAllProducts()
            res.json(products)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id
            const product = await getProduct(id)
            res.json(product)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createUser: async (req, res) => {
        try {
            const { userName, password, email, fName, lName } = req.body
            if(!userName || !password || !email || !fName || !lName) {
                return res.status(400).send('Missing required fields')
            }



            const passHash = require('bcrypt').hashSync(password, process.env.BCRYPT_KEY);
            const newUser = await createUser({userName, passHash, email, fName, lName})
            res.json(newUser)
            const token = require('jsonwebtoken').sign({ id: newUser.id }, process.env.TOKEN_SECRET, {
                expiresIn: '15m'
            });
            res.header('Authorization', `Bearer ${token}`).send(newUser);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            await deleteProduct(id)
            res.json({ message: 'Product deleted' })
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id
            const { name } = req.body
            const updatedProduct = await updateProduct(id, name)
            res.json(updatedProduct)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}