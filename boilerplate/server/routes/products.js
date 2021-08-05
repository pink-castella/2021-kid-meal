const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");

/*해당 가게의 상품 정보*/
router.post('/getProducts', (req, res) => {
    let store = req.body.store;

    Product.find({"store": store})
        .exec((err, productInfo) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({
            success: true,
            productInfo});
        });
});

/*productId로 상품 정보 불러오기*/
router.get('/products_by_id', (req, res) => {
    let type = req.query.type    // body 아니고 query
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    // productId를 이용해서 DB에서 productId와 같은 상품 정보를 가져온다.
    Product.find({ _id: {$in: productIds }})
    .populate('writer')
    .exec((err, product) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(product)
    })
})
  


module.exports = router;