import FinancialData from "../models/appModel.js";

const createManagingMonthYearAndAmount = async (req, res) => {
    const { month, year, totalAmount } = req.body;
    const { _id: userId } = req.user;

    const dataExists = await FinancialData.findOne({ user: userId, managingMonth: month, managingYear: year });

    if (dataExists) {
        res.status(409).json({
            message: 'Data already exists.',
        })
    } else {
        try {
            const financialData = await FinancialData.create({ user: userId, managingMonth: month, managingYear: year, totalAmount });

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
    }

}; 

export { createManagingMonthYearAndAmount }