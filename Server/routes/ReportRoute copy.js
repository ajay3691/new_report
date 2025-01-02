import express from 'express';
import Project from '../models/Project.js';
import Subcategory from '../models/Subcategory.js';
import Report from '../models/Report.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// Create Project and Subcategories
router.post('/projects', async (req, res) => {
    const { projectName, subcategories } = req.body;

    try {
        const project = await Project.create({ name: projectName });

        if (subcategories && subcategories.length > 0) {
            const subcategoryPromises = subcategories.map(({ name }) =>
                Subcategory.create({ name, projectId: project.id })
            );
            await Promise.all(subcategoryPromises);
        }

        res.status(201).json({ message: 'Project and subcategories created successfully', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Project and Subcategories
router.get('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const subcategories = await Subcategory.findAll({
            where: { projectId },
            attributes: ['id', 'name']
        });

        return res.status(200).json({
            project: {
                id: project.id,
                name: project.name
            },
            subcategories
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update Project and Subcategories
router.put('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { projectName, subcategories } = req.body;

    try {
        const [updated] = await Project.update({ name: projectName }, { where: { id: projectId } });
        if (!updated) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (subcategories && subcategories.length > 0) {
            await Subcategory.destroy({ where: { projectId } });
            const subcategoryPromises = subcategories.map(({ name }) =>
                Subcategory.create({ name, projectId })
            );
            await Promise.all(subcategoryPromises);
        }

        const updatedProject = await Project.findByPk(projectId);
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Project
router.delete('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        await Subcategory.destroy({ where: { projectId } });
        const deleted = await Project.destroy({ where: { id: projectId } });
        if (!deleted) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Report for a Subcategory
router.post('/reports', async (req, res) => {
    const { description, subcategoryId, employeeId } = req.body;

    try {
        const report = await Report.create({ description, subcategoryId, employeeId });
        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Reports for a Subcategory
router.get('/reports/:subcategoryId', async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        const reports = await Report.findAll({
            where: { subcategoryId },
            include: [
                { model: Employee, attributes: ['id', 'name'] }
            ],
            attributes: ['description', 'reportDate']
        });

        res.status(200).json({
            subcategoryId,
            reports: reports.map(report => ({
                description: report.description,
                reportDate: report.reportDate,
                employee: {
                    id: report.Employee.id,
                    name: report.Employee.name
                }
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
