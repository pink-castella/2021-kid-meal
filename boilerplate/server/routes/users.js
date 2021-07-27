const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        address: req.user.address,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
        currentAddress: req.user.currentAddress,
        favorites: req.user.favorites
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

//=================================
//          UserAddress
//=================================
/*주소 입력(등록)*/
router.post('/inputAddress', auth, (req, res) => { 
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: {
            address: {
                nickname: req.body.nickname, 
                address_name: req.body.address_name,
                location: {
                    x: req.body.x,
                    y: req.body.y
                }
            }
        } },
        { new: true },
        (err, userInfo) => {
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
                success: true,
                userInfo
            });
        });
});

/*주소 삭제*/
router.post('/removeAddress', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
            { "address": { "_id": req.body.id }} 
        },
        { new: true },
        (err, userInfo) => { 
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
                success: true,
                userInfo
            });
        });
});

/*주소 수정(별칭만)*/
router.post('/updateAddress', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id, "address._id": req.body.id }, //임시로 body
        {
            $set: { "address.$.nickname": req.body.nickname} 
        },
        { new: true },
        (err, userInfo) => { 
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
            success: true,
                userInfo
            });
        });
});

/*현재 주소 설정*/
router.post('/setCurrent', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: {
                currentAddress: {
                    nickname: req.body.nickname, 
                    address_name: req.body.address_name,
                    location: {
                        x: req.body.x,
                        y: req.body.y
                    }
                }
        } },
        { new: true },
        (err, currentAddress) => {
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
                success: true,
                currentAddress
            });
        });
});

//=================================
//            Favorite
//=================================

/*찜목록에 저장 */
router.post('/saveFavorite', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: {
            favorites: req.body.favorite
        } },
        { new: true },
        (err, userInfo) => {
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
                success: true,
                userInfo
            });
        });
});

/*찜 해제*/
router.post('/removeFavorite', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
            { "favorites": req.body.favorite }
        },
        { new: true },
        (err, userInfo) => { 
            if(err) return res.status(400).json({suceess: false, err});
                return res.status(200).json({
                    success: true,
                    userInfo
            });    
    });
});

//=================================
//              Cart
//=================================

router.post("/addToCart", auth, (req, res) => {
    // 먼저 users collection에 해당 유저의 정보를 가져오기
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {
            // 가져온 정보에 카트에 넣으려하는 상품이 이미 들어있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            // 상품이 이미 있을 때
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.body.productId },
                    { $inc: { "cart.$.quantity": req.body.productCount }},
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            // 상품이 이미 있지 않을 때
            } else {    
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    { 
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: req.body.productCount,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })    
})

router.get('/removeFromCart', auth, (req, res) => {
    // 먼저 cart에 있던 내가 지우려고 한 상품 지워주기
    User.findOneAndUpdate(
        { _id: req.user._id },
        { 
            "$pull": {
                "cart": { "id": req.query.id }
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

//=================================
//            Payment
//=================================

router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    // 1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣어주기
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentId
        })
    })
    
    // 2. Payment Collection 안에 자세한 결제 정보들 넣어주기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData
    transactionData.product = history

    // history 정보 저장
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: {} } },
        { new: true},
        (err, user) => {
            if (err) return res.json({ success: false, err })

            // payment에다가 transactionData 정보 저장
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })

                // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기

                // 상품 당 몇 개의 quantity를 샀는지
                let products = [];;
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        { 
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ 
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            })
        }
    )
})


module.exports = router;
