const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true 
    },
    isGiftcard: {
        type: Boolean,
        default: false,
        required: true 
    },
    title: { 
        type: String,
        maxlength: 50,
        required: true
    },
    description: { 
        type: String
    },
    price: { 
        type: Number,
        default: 0,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    /*
    countryOfOriginInfo: [{ 
        //원산지 그냥 여기 넣었는데 그냥 지울까
        ingredient: String,
        countryOfOrigin: String
    }]*/
}, { timestamps: true }); //자동으로 등록 및 업뎃시간 동기


const Product = mongoose.model('Product', productSchema);
module.exports = { Product };