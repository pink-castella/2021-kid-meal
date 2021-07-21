const express = require('express');
const router = express.Router();
const { Store } = require("../models/Store");
const {Product} = require("../models/Product");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");


/*
const body = {
    skip: Skip, //skip = 0 
    limit: Limit, //limit = 6
    filter: filter
}
Axios.post('/api/stores/getStores', formData, config)
*/

/*랜딩~>메인*/
router.post('/getStores', (req, res) => {

    //let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    //let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    
    //let x = 126.96756;
    //let y = 37.54460;
    let x = req.body.x; //현재 x 좌표(경도_longitude)
    let y = req.body.y; //현재 y 좌표(위도_latitude)
    //let radius = 500; //반경 500m 내 
    let radius = 0.5;
    
    //let findArgs = {};
    let findArgs = req.body.filters==="전체" ? {} : req.body.filters;
    console.log(findArgs);
    let term = req.body.searchTerm;
    
    /*현재 위치에서 500m이내*/
    if(term){
        Store.find({
            "storeAddress.location": {
                $geoWithin: {
                    $centerSphere: 
                        [[x, y], radius/6378.1]
                    }
            }
        })
        .find({"storeCategory": findArgs})
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
                $geoWithin: {
                    $centerSphere: 
                        [[x, y], radius/6378.1]
                    }
            }
        })
        .find({"storeCategory": findArgs})
        .exec((err, storeInfo) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                storeInfo,
                postSize: storeInfo.length
            }); });  
    }
    

    /*현재 위치에서 500m이내_가까운 순*/
    /*
    Store.find({
        "storeAddress.location": {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [126.96756, 37.54460]
                },
                $maxDistance: 500            
            }
        }
    })
    .exec((err, storeInfo) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({
            success: true,
            storeInfo,
            postSize: storeInfo.length
        }); });  */
});

/*
const body = {
    store: store
}
 */

/*선택한 가게의 상품 정보 */
router.post('/getProducts', (req, res) => {
    let store = req.body.store;

    Product.find({"store": store})
        .exec((err, productInfo) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({
            success: true,
            productInfo});
        })
});

module.exports = router;
