const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.post('/reports', async (req, res, next) => {
  const { id, employeeId, reportDetails, subCategoryList, seletedProjectList, reportDate, action } = req.body;

  try {
    // Handle "create" or "update" action
    if (action === 'create' || action === 'update') {
      const today = new Date().toISOString().slice(0, 10);
      const total = await Report.count({ where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), today) });

      if (total > 1 && !id) throw "Report already exists for today.";

      const data = {
        employeeId,
        reportDetails: JSON.stringify(reportDetails),
        subCategoryList: JSON.stringify(subCategoryList),
        seletedProjectList: JSON.stringify(seletedProjectList),
        reportDate
      };

      if (id && action === 'update') {
        await Report.update(data, { where: { id } });
        res.send({ status: "Success", message: "Report updated successfully", data: { id, ...data } });
      } else if (action === 'create') {
        const result = await Report.create(data);
        res.send({ status: "Success", message: "Report created successfully", data: result });
      }
    }

    // Handle "delete" action
    else if (action === 'delete' && id) {
      await Report.destroy({ where: { id } });
      res.send({ status: "Success", message: "Report deleted successfully" });
    }

    // Handle "get" action
    else if (action === 'get') {
      if (id) {
        const report = await Report.findByPk(id);
        res.send({ status: "Success", data: report });
      } else {
        const reports = await Report.findAll();
        res.send({ status: "Success", data: reports });
      }
    }

    // If no valid action is provided
    else {
      throw "Invalid action";
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
