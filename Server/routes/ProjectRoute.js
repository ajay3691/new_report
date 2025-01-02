import express from 'express';
import Project from '../models/Project.js'; // Adjust the path as needed

const router = express.Router();


// Create a new project
router.post('/projects', async (req, res) => {
    try {
        const { project_name } = req.body;
        const project = await Project.create({ project_name });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single project by ID
router.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a project by ID
router.put('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { project_name } = req.body;
        const [updated] = await Project.update({ project_name }, {
            where: { id }
        });
        if (updated) {
            const updatedProject = await Project.findByPk(id);
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a project by ID
router.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;
