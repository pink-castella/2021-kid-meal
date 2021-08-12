const express = require('express');
const router = express.Router();
const { Store } = require("../models/Store");
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
    let reviews = req.body.reviews;

    Store.findOneAndUpdate(
        { "_id": storeId },
        { $inc: {
            "reviews.count": 1,
            "reviews.ratings": reviews.ratings,

            "reviews.first.green": reviews.first.green,
            "reviews.first.yellow": reviews.first.yellow,
            "reviews.first.orange": reviews.first.orange,

            "reviews.second.green": reviews.second.green,
            "reviews.second.yellow": reviews.second.yellow,
            "reviews.second.orange": reviews.second.orange,

            "reviews.third.green": reviews.third.green,
            "reviews.third.yellow": reviews.third.yellow,
            "reviews.third.orange": reviews.third.orange,

            "reviews.fourth.green": reviews.fourth.green,
            "reviews.fourth.yellow": reviews.fourth.yellow,
            "reviews.fourth.orange": reviews.fourth.orange,

            "reviews.fifth.green": reviews.fifth.green,
            "reviews.fifth.yellow": reviews.fifth.yellow,
            "reviews.fifth.orange": reviews.fifth.orange,
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

/*가게 판매량 업데이트*/
router.post('/updateStoreSold', auth, (req, res) => {
    Store.findOneAndUpdate(
        { "_id": req.body.storeId },
        {
            $inc: { "sold": 1 }
        },
        { new: true },
        (err, storeInfo) => {
            if (err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                storeInfo
            });
        }
    );
})

module.exports = router;
