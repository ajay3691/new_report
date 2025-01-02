// routes/projects.js
import express from 'express';
import Project from '../models/Project.js';
import Subcategory from '../models/Subcategory.js';

const router = express.Router();

router.post('/projects1', async (req, res) => {
    const { projects } = req.body;

    // If no projects are provided, return an error
    if (!Array.isArray(projects) || projects.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Projects array is required.' });
    }

    try {
        const projectPromises = projects.map(async (project) => {
            const { projectName, subcategories } = project;

            // Validate project input
            if (!projectName || !Array.isArray(subcategories)) {
                throw new Error('Invalid project data');
            }

            // Create Project
            const createdProject = await Project.create({ name: projectName });

            // Create Subcategories
            if (subcategories.length > 0) {
                const subcategoryPromises = subcategories.map(subcategoryName =>
                    Subcategory.create({ name: subcategoryName, projectId: createdProject.id })
                );
                await Promise.all(subcategoryPromises);
            }

            return createdProject;
        });

        // Wait for all project creation to finish
        const createdProjects = await Promise.all(projectPromises);

        res.status(201).json({
            message: 'Projects and subcategories created successfully',
            projects: createdProjects
        });
    } catch (error) {
        console.error('Error creating projects and subcategories:', error);
        res.status(400).json({ error: error.message });
    }
});



// Get all projects with their subcategories
router.get('/projects1', async (req, res) => {
    try {
        // Find all projects
        const projects = await Project.findAll({
            include: {
                model: Subcategory,
                attributes: ['name']
            }
        });

        // Format the response
        const formattedProjects = projects.map(project => ({
            project: {
                id: project.id,
                name: project.name
            },
            subcategories: project.Subcategories.map(subcategory => ({
                name: subcategory.name
            }))
        }));

        res.status(200).json({ projects: formattedProjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// routes/projects.js
router.get('/projects1/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        // Find the project
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find subcategories associated with the project
        const subcategories = await Subcategory.findAll({
            where: { projectId },
            attributes: ['name']
        });

        // Format the response
        return res.status(200).json({
            project: {
                id: project.id,
                name: project.name
            },
            subcategories: subcategories.map(subcategory => ({
                name: subcategory.name
            }))
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// routes/projects.js
router.put('/projects1/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { projectName, subcategories } = req.body;

    try {
        // Update Project
        const [updated] = await Project.update({ name: projectName }, { where: { id: projectId } });
        if (!updated) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update Subcategories
        if (subcategories && subcategories.length > 0) {
            await Subcategory.destroy({ where: { projectId } }); // Remove existing subcategories
            const subcategoryPromises = subcategories.map(subcategoryName =>
                Subcategory.create({ name: subcategoryName, projectId })
            );
            await Promise.all(subcategoryPromises);
        }

        const updatedProject = await Project.findByPk(projectId);
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// routes/projects.js
router.delete('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        // Delete Subcategories
        await Subcategory.destroy({ where: { projectId } });

        // Delete Project
        const deleted = await Project.destroy({ where: { id: projectId } });
        if (!deleted) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
