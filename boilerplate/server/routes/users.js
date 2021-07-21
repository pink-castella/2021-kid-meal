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
        history: req.user.history
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
/*주소 목록 불러오기 */
router.get('/getAddress', auth, (req, res) => {
    User.find(
        { _id: req.user._id },
        { "address":1 })
        .exec((err,userAddresses) => {
            if(err) return res.status(400).send(err);
            return res.status(200).send({success: true, userAddresses});
        });
});

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
router.get('/removeAddress', auth, (req, res) => {
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

//=================================
//            Favorite
//=================================

/*찜목록에 저장 */
router.post('/saveFavorite', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: {
            favorite: req.body.favorite
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

/*찜목록 불러오기 */
router.get('/getFavorite', auth, (req, res) => {
    User.find(
        { _id: req.user._id },
        { "favorite": 1 })
        .populate("favorite")
        .exec((err,userFavorites) => {
            if(err) return res.status(400).send(err);
            return res.status(200).send({success: true, userFavorites});
        });
});

/*찜 해제 */
router.get('/removeFavorite', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
            { "favorite": req.body.favorite }
        },
        { new: true },
        (err, userFavorites) => { 
            if(err) return res.status(400).json({suceess: false, err});
                return res.status(200).json({
                    success: true,
                    userFavorites
            });    
    });
});

module.exports = router;
