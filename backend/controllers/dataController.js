import FinancialData from "../models/appModel.js";

const createFinancialData = async (req, res) => {
    const { month, year, collection, totalAmount, totalExpense, totalSavings } = req.body;
    const { _id: userId } = req.user;

        try {
            const financialData = await FinancialData.create({ user: userId, managingMonth: month, managingYear: year, totalAmount, categoryCollection: collection, totalExpense, totalSavings});

            const createdData = await financialData.save();

            res.status(201).json({
                message: 'Data added successfully.',
                user: createdData
            });
        } catch (error) {
            res.status(400).json({
                message: 'Failed to add data.',
            })
        }
        
}; 

export { createFinancialData }