const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment }  = require("../models/Payment");
const { auth } = require("../middleware/auth");

const async = require('async');

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
/*?????? ??????(??????)*/
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

/*?????? ??????*/
router.post('/removeAddress', auth, (req, res) => {
    //console.log('typeof(req.body.id)',typeof(req.body.id));
    //console.log('req.body.id',req.body.id);
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

/*?????? ??????(?????????)*/
router.post('/updateAddress', auth, (req, res) => {
    //console.log('req.body.id',req.body.id);
    User.findOneAndUpdate(
        { _id: req.user._id, "address._id": req.body.id }, //????????? body
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

/*?????? ?????? ??????*/
router.post('/setCurrent', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
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

/*???????????? ?????? */
router.post('/saveFavorite', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
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

/*??? ??????*/
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
/*??????????????? ??????*/
router.post("/addToCart", auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
    
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if ((item.storeId === req.body.storeId) &&
                    (item.productId === req.body.productId)) {
                    duplicate = true;
                }
            });

            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, 
                        "cart.storeId": req.body.storeId, 
                        "cart.productId": req.body.productId },
                    { $inc: { "cart.$.quantity": req.body.productCount }},
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err });
                        res.status(200).send(userInfo.cart);
                    }
                );
            } else {    
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    { 
                        $push: {
                            cart: {
                                storeId: req.body.storeId,
                                productId: req.body.productId,
                                quantity: req.body.productCount,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart);
                    }
                );}
        }); 
});

router.get('/removeFromCart', auth, (req, res) => {
    // ?????? cart??? ?????? ?????? ???????????? ??? ?????? ????????????
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

            // product Collection??? ?????? ???????????? ???????????? ????????? ????????????
            Product.find({ _id: { $in: array }})
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
/*?????? ??? DB ????????????*/
router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    function generateRandom() {
        // generate random string
        let length = 16;
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randS = "";

        while (length > 0) {
            randS += chars.charAt(Math.floor(Math.random() * chars.length));
            length--;
        }

        return randS;
    }

    // 1. User Collection ?????? History ?????? ?????? ????????? ?????? ?????? ????????????
    req.body.cartDetail.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {                
            history.push({
                id: generateRandom(),
                dateOfPurchase: Date.now(),
                name: item.title,
                storeId: item.store,
                productId: item._id,
                price: item.price,
                quantity: 1,
                productImg: item.image,
                paymentId: req.body.paymentData.id,
                mid: req.body.paymentData.mid,
                expiredDate: Date.now()+86400000*31,
                used: 0,
                hasReview: false
            })                
        }
    })

    // 2. Payment Collection ?????? ????????? ?????? ????????? ????????????
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData
    transactionData.product = history

    // history ?????? ?????? 
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err })

            // payment????????? transactionData ?????? ??????
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })

                // 3. Product Collection ?????? ?????? sold ?????? ?????? ???????????? ????????????
                // ?????? ??? ??? ?????? quantity??? ?????????
                let products = [];
                doc.product.forEach(item => {
                    products.push({ productId: item.productId, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.productId },
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

//=================================
//            MyPage
//=================================
/*?????? ?????? ??????*/
router.post('/successUse', auth, (req, res) => {    
    User.findOneAndUpdate(
        { _id: req.user._id, "history.id": req.body.id },
        {
            $set: { "history.$.used": Date.now() } 
        },
        { new: true },
        (err, userInfo) => { 
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
            success: true,
                userInfo
            });
        }
    );
});

/*?????? ?????? ??????*/
router.post('/successReview', auth, (req, res) => {    
    User.findOneAndUpdate(
        { _id: req.user._id, "history.id": req.body.id },
        {
            $set: { "history.$.hasReview": true } 
        },
        { new: true },
        (err, userInfo) => { 
            if(err) return res.status(400).json({suceess: false, err});
            return res.status(200).json({
            success: true,
                userInfo
            });
        }
    );
});


module.exports = router;
