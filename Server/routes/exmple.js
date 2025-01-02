// Assuming you have the necessary imports and database connection setup
const express = require('express');
const router = express.Router();
const connection = require('./db'); // Your MySQL connection

router.post('/reports', async (req, res, next) => {
  const { id, employeeId, reportDetails, subCategoryList, seletedProjectList, reportDate, action } = req.body;

  try {
    // Handle "create" or "update" action
    if (action === 'create' || action === 'update') {
      const sqlCheck = `SELECT count(*) as total FROM tbl_emp_reports WHERE date(created_at) = curdate()`;
      const [total] = await connection.execute(sqlCheck);
      if (total[0].total > 1 && !id) throw "Report already exists for today.";

      const reportDetailsString = JSON.stringify(reportDetails);
      const subCategoryListString = JSON.stringify(subCategoryList);
      const seletedProjectListString = JSON.stringify(seletedProjectList);
      let data = { employeeId, reportDetails };

      if (id && action === 'update') {
        const sql = `UPDATE tbl_emp_reports SET employeeId=?, reportDetails=?, subCategoryList=?, seletedProjectList=?, reportDate=? WHERE id=?`;
        await connection.execute(sql, [employeeId, reportDetailsString, subCategoryListString, seletedProjectListString, reportDate, id]);
        data.id = id;
        res.send({ status: "Success", message: "Report updated successfully", data });
      } else if (action === 'create') {
        const sql = `INSERT INTO tbl_emp_reports (employeeId, reportDetails, subCategoryList, seletedProjectList, reportDate) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(sql, [employeeId, reportDetailsString, subCategoryListString, seletedProjectListString, reportDate]);
        data.id = result.insertId;
        res.send({ status: "Success", message: "Report created successfully", data });
      }
    }

    // Handle "delete" action
    else if (action === 'delete' && id) {
      const sql = `DELETE FROM tbl_emp_reports WHERE id=?`;
      await connection.execute(sql, [id]);
      res.send({ status: "Success", message: "Report deleted successfully" });
    }

    // Handle "get" action
    else if (action === 'get') {
      let sql;
      let params = [];
      if (id) {
        sql = `SELECT * FROM tbl_emp_reports WHERE id=?`;
        params.push(id);
      } else {
        sql = `SELECT * FROM tbl_emp_reports`;
      }
      const [result] = await connection.execute(sql, params);
      res.send({ status: "Success", data: id ? result[0] : result });
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
