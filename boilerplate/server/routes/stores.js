const express = require('express');
const router = express.Router();
const { Store } = require("../models/Store");
const {Product} = require("../models/Product");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");


/*가게 목록 불러오기*/
router.post('/getStores', (req, res) => {

    //let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    //let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    
    //let x = 126.967488;
    //let y = 37.543402; //가희집으로 위치 변경
    let x = req.body.x; //현재 x 좌표(경도_longitude)
    let y = req.body.y; //현재 y 좌표(위도_latitude)
    console.log('x', x);
    console.log('y', y);

    //let findArgs = {};
    let findArgs = req.body.filters==="전체" ? {} : {"storeCategory": req.body.filters};
    //let findArgs = req.body.filters==="전체" ? {} : req.body.filters;
    console.log('findArgs', findArgs);
    let term = req.body.searchTerm;
    console.log('term', term);
    /*현재 위치에서 500m이내_가까운 순*/
    if(term){
        Store.find({
            "storeAddress.location": {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [x, y]
                    },
                    $maxDistance: 500            
                }
            }
        })
        .find(findArgs)
        //.find({"storeCategory": findArgs})
        //.find({ $text: {$search: term}})
        .find({"storeName": new RegExp(term)})
        .exec((err, storeInfo) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                storeInfo,
                postSize: storeInfo.length
            }); });  
    }else{
        Store.find({
            "storeAddress.location": {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [x, y]
                    },
                    $maxDistance: 500            
                }
            }
        })
        .find(findArgs)
        //.find({"storeCategory": findArgs})
        .exec((err, storeInfo) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                storeInfo,
                postSize: storeInfo.length
            }); });  
    }
});

/*해당 가게의 상품 정보 */
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

/*선택한 가게의 정보 */
router.post('/getStoreInfo', (req, res) => {
    let store = req.body.store;

    Store.find({"_id": store})
        .exec((err, storeInfo) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                storeInfo});
        });
});

/*찜목록 불러오기 */
router.post('/getFavorites', auth, (req, res) => {
    let type = typeof(req.body.favoriteIdArr)    // body 아니고 query
    let storeIds = req.body.favoriteIdArr

    console.log('ids'+storeIds)

    if (type === "array") {
        let ids = req.body.favoriteIdArr.split(',')
        storeIds = ids.map(item => {
            return item
        })
    }

    Store.find({ _id: {$in: storeIds} })
        .populate("store")
        .exec((err, stores) => {
            if(err) return res.status(400).send(err);
            return res.status(200).send({success: true, stores});
        });
});

/*리뷰작성*/
router.post('/addReview', auth, (req, res) => {
    let storeId = req.body.storeId;
    let ratings = req.body.ratings;
    let reviews = req.body.reviews;

    Store.findOneAndUpdate(
        { "_id": storeId },
        { $push: {
            ratings: ratings,
            reviews: {
                first: reviews.first,
                second: reviews.second,
                third: reviews.third,
                fourth: reviews.fourth,
                fifth: reviews.fifth
            }
        } },
        { new: true },
        (err, storeInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({
                success: true,
                storeInfo
            });
        }
    )
        
});

// 상품 상세 정보
router.get('/products_by_id', (req, res) =>{ 
    
    let type = req.query.type               // req.body 대신 req.query   
    let productIds = req.query.id
  
    if(type === "array"){
      // id = 121212, 23232, 344532..로 받아온 것을
      // productIds = ['121212', '23232', '344532'] 로 바꾸는 작업
      let ids = req.query.id.split(',')
      productIds = ids.map(item => {
        return item
      })
    }
  
    Product.find({_id: {$in: productIds}})
      .populate('writer')
      .exec((err, product) => {
        if(err) return res.status(400).send(err)
        return res.status(200).send(product)
      })
})


router.get('/removeFromCart', auth, (req, res) => {
    // 먼저 지우려고 한 상품 지워주기
    User.findOneAndUpdate(
        { _id: req.user._id },
        { 
            "$pull": {
                "cart": { "productId": req.query.id }
            }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            // product Collection에 현재 남아있는 상품들의 정보를 가져오기
            Product.find({ _id: { $in: array }})
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
        }
    )
})

module.exports = router;
