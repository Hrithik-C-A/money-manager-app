import FinancialData from "../models/appModel.js";
import asyncHandler from 'express-async-handler';

const createFinancialData = asyncHandler(async (req, res) => {
    const { month, year, totalAmount } = req.body;
    const { _id: userId } = req.user;

    const dataExists = await FinancialData.findOne({ user: userId, managingMonth: month, managingYear: year });

    if (dataExists) {
        res.status(409);
        throw new Error('Data already exists.');
    } else {
        try {
            const financialData = await FinancialData.create({ user: userId, managingMonth: month, managingYear: year, totalAmount });

            const createdData = await financialData.save();

            res.status(201).json(createdData);
        } catch (error) {
            res.status(400);
            throw new Error('Failed to add data.');
        }
    }

});

const deleteFinancialData = asyncHandler(async (req, res) => {
    const deletedData = await FinancialData.findByIdAndDelete(req.params.id);

    if (!deletedData) {
        res.status(404);
        throw new Error('Resource not found.');
    }

    res.status(200).json({
        message: 'Data deleted successfully.'
    });
});

const createCategory =  asyncHandler(async (req, res) => {
    const { collection } = req.body;

    const financialData = await FinancialData.findById(req.params.id);

    if (financialData) {

        const totalAmountSpentByCategory = collection.map(item => {
            const totalSpentAmount = item.subCategory.reduce((sum, p) => sum + p.amountPaid, 0);
            return item.totalSpent = totalSpentAmount;
        });
        
        const totalExpenseAmount = totalAmountSpentByCategory.reduce((total, amount) => total + amount, 0);
        financialData.totalExpense = financialData.totalExpense + totalExpenseAmount;
        
        const totalSavingsAmount = financialData.totalAmount - financialData.totalExpense;
        financialData.totalSavings = totalSavingsAmount;

        financialData.categoryCollection.push(...collection);


        const createdData = await financialData.save();

        res.status(201).json(createdData);
    } else {
        res.status(400);
        throw new Error('Failed to add data.');
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.body;

    const deletedCategory = await FinancialData.findByIdAndUpdate({_id: req.params.id}, {
        $pull: { categoryCollection: { _id: categoryId } }
    });
    
    if (!deletedCategory) {
        res.status(404);
        throw new Error('Resource not found.')
    }

    const financialData = await FinancialData.findById(req.params.id);

    financialData.totalExpense = financialData.categoryCollection.reduce((total, item ) => total + item.totalSpent, 0);

    financialData.totalSavings = financialData.totalAmount - financialData.totalExpense;

    await financialData.save();

    res.json(financialData);
});

const updateSubCategory = asyncHandler(async (req, res) => {
    const { subCategoryName, amountPaid, categoryId, subCategoryId } = req.body;
    
    const financialData = await FinancialData.findById(req.params.id);

    if (financialData) {
        
        const category = financialData.categoryCollection.filter(item => item._id.equals(categoryId));

        const subCategory = category[0].subCategory.find(item => item._id.equals(subCategoryId));

       if (category && subCategory) {

        subCategory.amountPaid = amountPaid;

        subCategory.subCategoryName = subCategoryName;
    
        const totalAmountSpentByCategory = category.map(item => item.subCategory.reduce((total, x) => total + x.amountPaid, 0));
        category[0].totalSpent = totalAmountSpentByCategory[0];
    
        const totalAmountByEachCategory = financialData.categoryCollection.reduce((total,item) => total + item.totalSpent, 0);
        financialData.totalExpense = totalAmountByEachCategory;
    
        financialData.totalSavings = financialData.totalAmount -  financialData.totalExpense;

        const updatedData = await financialData.save();

        res.status(200).json(updatedData);
       } else {
        res.status(400);
        throw new Error('Failed to update data.');
       }
        
    } else {
        res.status(400);
        throw new Error('No Data Found.');
    }

});

export { createFinancialData, deleteFinancialData, createCategory, updateSubCategory, deleteCategory  };