
import express from 'express';
import Employee from '../models/Employee.js';
import Projects from '../models/Project.js';
import Subcategory from '../models/Subcategory.js';
import Report from '../models/Report.js';
import { authenticate, adminOnly, employeeOnly } from '../middlewere/Middileware1.js'

const router = express.Router()
// Middleware to authenticate the employee using JWT


/*   // POST /projects - Create a new project
  router.post('/projects', authenticate,adminOnly, async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
  
    try {
      const project = await Projects.create({ name });
      res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }); */

// Unified CRUD API
router.all('/projects', async (req, res) => {
    const { method, query, body, params } = req;
    const { id } = params;
    const { name } = body;

    try {
        switch (method) {
            case 'POST':
                // Create Project
                if (!name) {
                    return res.status(400).json({ error: 'Project name is required' });
                }
                const createdProject = await Projects.create({ name });
                return res.status(201).json({ message: 'Project created successfully', project: createdProject });

            case 'GET':
                // Read All Projects
                if (!id) {
                    const projects = await Projects.findAll();
                    return res.status(200).json({ projects });
                }
                // Read Single Project
                const project = await Projects.findByPk(id);
                if (!project) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json({ project });

            case 'PUT':
                // Update Project
                if (!id || !name) {
                    return res.status(400).json({ error: 'Project ID and name are required' });
                }
                const [updated] = await Projects.update({ name }, { where: { id } });
                if (!updated) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                const updatedProject = await Projects.findByPk(id);
                return res.status(200).json({ message: 'Project updated successfully', project: updatedProject });

            case 'DELETE':
                // Delete Project
                if (!id) {
                    return res.status(400).json({ error: 'Project ID is required' });
                }
                const deleted = await Projects.destroy({ where: { id } });
                if (!deleted) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json({ message: 'Project deleted successfully' });

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
/* // Post a Subcategory under a Project
router.post('/projects/:projectId/subcategories', authenticate,adminOnly, async (req, res) => {
    const { name } = req.body;
    const { projectId } = req.params;
    try {
        const subcategory = await Subcategory.create({ name, projectId });
        res.status(201).json({ message: 'Subcategory created successfully', subcategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});*/
// Unified CRUD API for Subcategories
router.all('/projects/:projectId/subcategories', authenticate, adminOnly, async (req, res) => {
    const { method, body, params } = req;
    const { projectId } = params;
    const { id, name } = body;

    try {
        switch (method) {
            case 'POST':
                // Create Subcategory
                if (!name) {
                    return res.status(400).json({ error: 'Subcategory name is required' });
                }
                const createdSubcategory = await Subcategory.create({ name, projectId });
                return res.status(201).json({ message: 'Subcategory created successfully', subcategory: createdSubcategory });

            case 'GET':
                // Read All Subcategories for a specific Project
                if (!id) {
                    const subcategories = await Subcategory.findAll({ where: { projectId } });
                    return res.status(200).json({ subcategories });
                }
                // Read Single Subcategory
                const subcategory = await Subcategory.findByPk(id);
                if (!subcategory || subcategory.projectId !== projectId) {
                    return res.status(404).json({ error: 'Subcategory not found' });
                }
                return res.status(200).json({ subcategory });

            case 'PUT':
                // Update Subcategory
                if (!id || !name) {
                    return res.status(400).json({ error: 'Subcategory ID and name are required' });
                }
                const [updated] = await Subcategory.update({ name }, { where: { id, projectId } });
                if (!updated) {
                    return res.status(404).json({ error: 'Subcategory not found' });
                }
                const updatedSubcategory = await Subcategory.findByPk(id);
                return res.status(200).json({ message: 'Subcategory updated successfully', subcategory: updatedSubcategory });

            case 'DELETE':
                // Delete Subcategory
                if (!id) {
                    return res.status(400).json({ error: 'Subcategory ID is required' });
                }
                const deleted = await Subcategory.destroy({ where: { id, projectId } });
                if (!deleted) {
                    return res.status(404).json({ error: 'Subcategory not found' });
                }
                return res.status(200).json({ message: 'Subcategory deleted successfully' });

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// Get All Projects
router.get('/projects', authenticate, async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Subcategories by Project
router.get('/projects/:projectId/subcategories', authenticate, async (req, res) => {
    const { projectId } = req.params;
    try {
        const subcategories = await Subcategory.findAll({ where: { projectId } });
        res.json(subcategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Post a Report
router.post('/reports', authenticate, async (req, res) => {
    const { date, description, subcategoryId } = req.body;
    try {
        const report = await Report.create({
            date,
            description,
            employeeId: req.employeeId,  // Automatically save the logged-in employee's ID
            subcategoryId,
        });
        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Reports by Logged-in Employee
router.get('/reports', authenticate, async (req, res) => {
    try {
        const reports = await Report.findAll({ where: { employeeId: req.employeeId }, include: [Subcategory] });
        res.json(reports);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router