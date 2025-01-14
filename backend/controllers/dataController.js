import FinancialData from "../models/appModel.js";
import asyncHandler from 'express-async-handler';

//Handling financial data

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

const updateFinancialData = asyncHandler(async (req, res) => {
    const { month, year, totalAmount } = req.body;

    const financialData = await FinancialData.findById(req.params.id);

    if (!financialData) {
        res.status(400);
        throw new Error('No Data Found.');
    }

    financialData.managingMonth = month;

    financialData.managingYear = year;

    financialData.totalAmount = totalAmount;

    financialData.totalSavings = financialData.totalAmount - financialData.totalExpense;

    const updatedData = await financialData.save();

    res.json(updatedData);
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

const getFinancialData = asyncHandler(async (req, res) => {
    const financialData = await FinancialData.find({});

    if (!financialData) {
        res.status(404);
        throw new Error('Data not found.')
    }

    res.json(financialData);
});

const getFinancialDataById = asyncHandler(async (req, res) => {
    const financialData = await FinancialData.findById(req.params.id);

    if (!financialData) {
        res.status(404);
        throw new Error('Data not found.')
    }

    res.json(financialData);
});

//Handling categories

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

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryName, categoryId } = req.body;
    
    const financialData = await FinancialData.findById(req.params.id);

    if (financialData) {
        
        const category = financialData.categoryCollection.find(item => item._id.equals(categoryId));

       if (category) {

        category.categoryName = categoryName;

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

//Handling subCategory

const createSubCategory = asyncHandler(async (req, res) => {
    const { subCategoryName, amountPaid, categoryId } = req.body;

    const financialData = await FinancialData.findById(req.params.id);

    const subCategory = { subCategoryName, amountPaid };

    if (financialData) {
        const category = financialData.categoryCollection.find(item => item._id.equals(categoryId));

        category.subCategory.push(subCategory);

        const totalAmountSpentByCategory = category.subCategory.reduce((total, item) => total + item.amountPaid, 0);

        category.totalSpent = totalAmountSpentByCategory;
    
        const totalAmountByEachCategory = financialData.categoryCollection.reduce((total,item) => total + item.totalSpent, 0);
        financialData.totalExpense = totalAmountByEachCategory;
    
        financialData.totalSavings = financialData.totalAmount -  financialData.totalExpense;

        const createdData = await financialData.save();

        res.status(201).json(createdData);
    } else {
        res.status(400);
        throw new Error('Failed to add data.');
    }
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

const deleteSubCategory = asyncHandler(async (req, res) => {
    const { categoryId, subCategoryId  } = req.body;

    const deletedSubCategory = await FinancialData.findByIdAndUpdate({_id: req.params.id}, {
        $pull: { "categoryCollection.$[].subCategory": { _id: subCategoryId } }
    });
    
    if (!deletedSubCategory) {
        res.status(404);
        throw new Error('Resource not found.')
    }

    const financialData = await FinancialData.findById(req.params.id);

    const category = financialData.categoryCollection.find(item => item._id.equals(categoryId));

    const totalAmountSpentByCategory = category.subCategory.reduce((total, item) => total + item.amountPaid, 0);

    category.totalSpent = totalAmountSpentByCategory;

    const totalAmountByEachCategory = financialData.categoryCollection.reduce((total,item) => total + item.totalSpent, 0);
    financialData.totalExpense = totalAmountByEachCategory;

    financialData.totalSavings = financialData.totalAmount -  financialData.totalExpense;

    const deletedData = await financialData.save();

    res.json(deletedData);
});

export { createFinancialData, updateFinancialData, deleteFinancialData, getFinancialData, getFinancialDataById, createCategory, updateCategory, deleteCategory,createSubCategory, updateSubCategory, deleteSubCategory };