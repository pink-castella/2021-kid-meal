const express = require('express');
const router = express.Router();
const { Store } = require("../models/Store");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

/*랜딩페이지에서 위도경도 보내면 거리 계산해서 
반경 500m이내 가게 목록 띄우도록 => main페이지에
const body = {
    address_name: String, //이건 db에 저장 
    y: String, 
    x: String
}
const body = {
    skip: Skip, //skip = 0 
    limit: Limit, //limit = 6
    filters: filters
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
    let radius = 500; //반경 500m 내 
    
    //let findArgs = req.body.filters;

    Store.aggregate([{ 
        $geoNear: {
            spherical: true, 
            maxDistance: radius,
            near:{ 
                type:'Point',
                coordinates:[ x, y ]
            },
            distanceField: 'distance',
            key: 'storeAddress.location'
        }
    }]).exec((err, storeInfo) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({
            success: true,
            storeInfo,
        }); });
        //.find(findArgs);   
   

});


module.exports = router;
