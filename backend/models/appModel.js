import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    subCategory: [{
        subCategoryName: {
            type: String,
            required: true
        },
        amountPaid: {
            type: Number,
            required: true
        },
        date: {
            type: Date
        },
    }],
    totalSpent: {
        type: Number,
        required: false
    }
},{
    timestamps: true
});

const finanacialDataSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    managingMonth: {
        type: String,
        required: true
    },
    managingYear: {
        type: String,
        required: true
    },
    categoryCollection: [categorySchema],
    totalAmount: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
        required: false
    },
    totalSavings: {
        type: Number,
        required: false
    },
},{
    timestamps: true,
});

const FinancialData = model('FinancialData', finanacialDataSchema);

export default FinancialData;