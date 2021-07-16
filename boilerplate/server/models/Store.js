const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    storeId: {  
        type: String,
        required: true
    },
    storeName: {    
        type: String,
        maxlength: 50,
        required: true
    },
    storeCategory:{ 
        type: String,
    }, 
    storeDescription: {
        type: String
    },
    storeImages: {
        type: Array,
        default: []
    },
    hour: [{ 
        open: String,
        close: String
    }],
    dayoff: { 
        type: String
    },
    contact: { 
        type: String
    },
    storeAddress: [{
        address_name: String,
        x: String,
        y: String
    }],
    distance: { 
        type: Number,
        default: 0
    },
    sanitary: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number
    },
    sold: { //판매량 
        type: Number,
        default: 0
    },
    storeOwner: [{// 사업자 정보
        ownerName: String, 
        tradeName: String, 
        businessRegistrationNumber: String 
    }]
}, { timestamps: true });

//검색할 때 storeName과 description에 중점
storeSchema.index({ 
    storeName:'text',
    storeDescription: 'text',
}, {
    weights: {
        storeName: 5,
        storeDescription: 1,
    }
});


const Store = mongoose.model('Store', storeSchema);
module.exports = { Store };