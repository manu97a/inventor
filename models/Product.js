import mongoose, { mongo } from "mongoose";
const ProductSchema = new mongoose.Schema({
    externalId:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    productType:{
        type:String,
        required: true,
    },
    internalReference: {
        type: String
    },
    cost:{
        type: Number,
        required: true,
    },
    vendors:{
        type: String,
        required: true,
    },
    weeklyRequiredQuantity:{
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
})
export default mongoose.models.Product || mongoose.model("Product",ProductSchema)


