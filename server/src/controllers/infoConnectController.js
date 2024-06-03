const InfoConnect = require('../models/infoConnectModel');

const infoConnectController = {
    getInfoConnect: async (req, res) => {
        try {
            const infoConnect = await InfoConnect.findOne({
                tenantID: req.tenantID,
            });
            res.json({ success: true, data: infoConnect });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllInfoConnects: async (req, res) => {
        try {
            const allInfoConnects = await InfoConnect.find();
            res.json({ success: true, data: allInfoConnects });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateInfoConnect: async (req, res) => {
        try {
            const { shop_key, secret_key } = req.body;
            const updateInfoConnectCondition = { tenantID: req.tenantID };
            let updatedInfoConnect = await InfoConnect.findOneAndUpdate(
                updateInfoConnectCondition,
                { shop_key, secret_key },
                { new: true }
            );
            if (!updatedInfoConnect) {
                // Create new document if not found
                updatedInfoConnect = new InfoConnect({
                    tenantID: req.tenantID,
                    shop_key,
                    secret_key
                });
                await updatedInfoConnect.save();
                res.json({
                    success: true,
                    message: "InfoConnect created successfully",
                    infoConnect: updatedInfoConnect,
                });
            } else {
                res.json({
                    success: true,
                    message: "InfoConnect updated successfully",
                    infoConnect: updatedInfoConnect,
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = infoConnectController;
