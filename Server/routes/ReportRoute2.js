import { Router } from 'express';
import { Op } from 'sequelize';
import Report from '../models/Report.js';
import Subcategory from '../models/Subcategory.js';
import Employee from '../models/Employee.js';
import Project from '../models/Project.js';
import { authenticate, employeeOnly,adminOnly } from '../middlewere/Middileware1.js';

const router = Router();

/* router.post('/reports', authenticate, employeeOnly, async (req, res) => {
    const { reports } = req.body; // reports is an array of { projectId, subcategoryReports }

    const employeeId = req.user.id; // Extracted from JWT

    // Validate incoming data
    if (!Array.isArray(reports)) {
        return res.status(400).json({ error: 'Invalid reports format' });
    }

    try {
        // Process each project report
        const reportPromises = reports.flatMap(async ({ projectId, subcategoryReports }) => {
            // Validate subcategory existence
            const subcategoryIds = subcategoryReports.map(report => report.subcategoryId);
            const subcategories = await Subcategory.findAll({
                where: { id: subcategoryIds }
            });

            // Check if all provided subcategories exist
            if (subcategories.length !== subcategoryReports.length) {
                throw new Error(`Some subcategories in project ${projectId} not found`);
            }

            // Create reports for the current project
            return Promise.all(subcategoryReports.map(({ subcategoryId, description }) =>
                Report.create({
                    report: description,
                    subcategoryId,
                    employeeId,
                    reportDate: new Date(), // Use current date for the report
                    projectId // Assuming you want to store the projectId in the Report
                })
            ));
        });

        // Execute all report creation promises and flatten the results
        const createdReports = (await Promise.all(reportPromises)).flat();

        res.status(201).json({
            message: 'Reports created successfully',
            reports: createdReports
        });
    } catch (error) {
        console.error('Error creating reports:', error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
});
  */
// GET endpoint to fetch all reports (Admins only)

/*  router.post('/reports', authenticate, employeeOnly, async (req, res) => {

    const { reports } = req.body;

    const employeeId = req.user.id;

    // Validate incoming data
    if (!Array.isArray(reports)) {
        return res.status(400).json({ error: 'Invalid reports format' });
    }

    try {
        // Process each project report
        const reportPromises = reports.map(async ({ projectId, subcategoryReports }) => {
            const subcategoryIds = subcategoryReports.map(report => report.subcategoryId);
            
            // Validate that all subcategories exist for the project
            const subcategories = await Subcategory.findAll({
                where: {
                    id: subcategoryIds,
                    projectId
                }
            });

            // Check if all provided subcategories exist
            if (subcategories.length !== subcategoryReports.length) {
                throw new Error(`Some subcategories in project ${projectId} not found`);
            }

            // Create reports for the current project
            return Promise.all(subcategoryReports.map(({ subcategoryId, description }) =>
                Report.create({
                    report: description,
                    subcategoryId,
                    employeeId,
                    reportDate: new Date(),
                    projectId
                })
            ));
        });

        // Execute all report creation promises and flatten the results
        const createdReports = (await Promise.all(reportPromises)).flat();

        res.status(201).json({
            message: 'Reports created successfully',
            reports: createdReports
        });
    } catch (error) {
        console.error('Error creating reports:', error);
        res.status(400).json({ error: error.message });
    }
}); */
 

/* router.post('/reports', authenticate, employeeOnly, async (req, res) => {
    const { reports } = req.body;
    const employeeId = req.user.id;

    // Validate incoming data
    if (!Array.isArray(reports)) {
        return res.status(400).json({ error: 'Invalid reports format' });
    }

    try {
        // Process each project report
        const reportPromises = reports.map(async ({ projectId, subcategoryReports }) => {
            const subcategoryIds = subcategoryReports.map(report => report.subcategoryId);
            
            // Debugging output
            console.log(`Fetching subcategories for project ${projectId} with IDs ${subcategoryIds}`);

            // Validate that all subcategories exist for the project
            const subcategories = await Subcategory.findAll({
                where: {
                    id: subcategoryIds,
                    projectId
                }
            });

            // Debugging output
            console.log(`Fetched subcategories for project ${projectId}:`, subcategories.map(sc => sc.id));

            // Check if all provided subcategories exist
            if (subcategories.length !== subcategoryReports.length) {
                throw new Error(`Some subcategories in project ${projectId} not found`);
            }

            // Create reports for the current project
            return Promise.all(subcategoryReports.map(({ subcategoryId, description }) =>
                Report.create({
                    report: description,
                    subcategoryId,
                    employeeId,
                    reportDate: new Date(),
                    projectId
                })
            ));
        });

        // Execute all report creation promises and flatten the results
        const createdReports = (await Promise.all(reportPromises)).flat();

        res.status(201).json({
            message: 'Reports created successfully',
            reports: createdReports
        });
    } catch (error) {
        console.error('Error creating reports:', error);
        res.status(400).json({ error: error.message });
    }
});
 */

router.post('/reports', authenticate, employeeOnly, async (req, res) => {
    const { reports } = req.body; // reports is an array of { projectId, subcategoryReports }

    const employeeId = req.user.id; // Extracted from JWT

    // Validate incoming data
    if (!Array.isArray(reports)) {
        return res.status(400).json({ error: 'Invalid reports format' });
    }

    try {
        // Create a map of project names to their IDs
        const projects = await Project.findAll();
        const projectMap = new Map(projects.map(p => [p.name, p.id]));

        // Process each project report
        const reportPromises = reports.map(async ({ projectId: projectName, subcategoryReports }) => {
            // Convert project name to project ID
            const projectId = projectMap.get(projectName);
            if (!projectId) {
                throw new Error(`Project with name ${projectName} not found`);
            }

            // Get subcategory names
            const subcategoryNames = subcategoryReports.map(report => report.subcategoryName);

            // Fetch subcategories based on names and project ID
            const subcategories = await Subcategory.findAll({
                where: {
                    name: subcategoryNames,
                    projectId: projectId // Use the projectId here
                }
            });

            // Create a map of subcategory names to their IDs for validation
            const subcategoryMap = new Map(subcategories.map(sc => [sc.name, sc.id]));

            // Validate that all provided subcategories exist
            const missingSubcategories = subcategoryReports.filter(
                report => !subcategoryMap.has(report.subcategoryName)
            );
            if (missingSubcategories.length > 0) {
                throw new Error(`Some subcategories in project ${projectName} not found`);
            }

            // Create reports for the current project
            return Promise.all(subcategoryReports.map(({ subcategoryName, description }) =>
                Report.create({
                    report: description,
                    subcategoryId: subcategoryMap.get(subcategoryName),
                    employeeId,
                    reportDate: new Date(), // Use current date for the report
                    projectId: projectId // Store project ID in the Report
                })
            ));
        });

        // Execute all report creation promises and flatten the results
        const createdReports = (await Promise.all(reportPromises)).flat();

        res.status(201).json({
            message: 'Reports created successfully',
            reports: createdReports
        });
    } catch (error) {
        console.error('Error creating reports:', error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
});


router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.findAll({
            include: [
                {
                    model: Subcategory,
                    attributes: ['name'],
                    include: [
                        {
                            model: Project,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: Employee,
                    attributes: ['id', 'employee_name']
                }
            ]
        });

        // Organize reports by project and subcategory
        const organizedReports = reports.reduce((acc, report) => {
            const projectName = report.Subcategory.Project.name;
            const subcategoryName = report.Subcategory.name;

            if (!acc[projectName]) {
                acc[projectName] = {};
            }
            if (!acc[projectName][subcategoryName]) {
                acc[projectName][subcategoryName] = [];
            }

            acc[projectName][subcategoryName].push({
                reportDate: report.reportDate,
                description: report.report,
                employeeId: report.Employee.id,
                employeeName: report.Employee.employee_name
            });

            return acc;
        }, {});

        res.status(200).json({
            message: 'Reports fetched successfully',
            reports: organizedReports
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/admin/reports', authenticate, adminOnly, async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        // Build the query filter based on date range
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                reportDate: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            };
        } else if (startDate) {
            dateFilter = {
                reportDate: {
                    [Op.gte]: new Date(startDate)
                }
            };
        } else if (endDate) {
            dateFilter = {
                reportDate: {
                    [Op.lte]: new Date(endDate)
                }
            };
        }

        // Fetch all reports with date filtering and order by most recent first
        const reports = await Report.findAll({
            where: dateFilter,
            order: [['reportDate', 'DESC']],
            include: [{ model: Employee }, { model: Subcategory }, { model: Project }]
        });

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(400).json({ error: error.message });
    }
});



// GET endpoint to fetch reports for a specific employee
router.get('/reports/employee', authenticate, async (req, res) => {
    const employeeId = req.user.id; // Extracted from JWT

    try {
        const reports = await Report.findAll({
            where: { employeeId },
            include: [
                {
                    model: Subcategory,
                    attributes: ['name'],
                    include: [
                        {
                            model: Project,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: Employee,
                    attributes: ['id', 'employee_name']
                }
            ]
        });

        // Organize reports by project and subcategory
        const organizedReports = reports.reduce((acc, report) => {
            const projectName = report.Subcategory.Project.name;
            const subcategoryName = report.Subcategory.name;

            if (!acc[projectName]) {
                acc[projectName] = {};
            }
            if (!acc[projectName][subcategoryName]) {
                acc[projectName][subcategoryName] = [];
            }

            acc[projectName][subcategoryName].push({
                reportDate: report.reportDate,
                description: report.report,
                employeeId: report.Employee.id,
                employeeName: report.Employee.employee_name
            });

            return acc;
        }, {});

        res.status(200).json({
            message: 'Reports fetched successfully for employee',
            reports: organizedReports
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
