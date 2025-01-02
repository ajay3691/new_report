import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const SubmitReport = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState([]);
    const [selectedSubcategoryNames, setSelectedSubcategoryNames] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:9000/projects1');
                setProjects(response.data.projects);
            } catch (error) {
                setError('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);

    const handleProjectSelect = (projectId) => {
        if (selectedProjectIds.includes(projectId)) {
            setSelectedProjectIds(selectedProjectIds.filter(id => id !== projectId));
            const { [projectId]: _, ...remaining } = selectedSubcategoryNames;
            setSelectedSubcategoryNames(remaining);
        } else {
            setSelectedProjectIds([...selectedProjectIds, projectId]);
        }
    };
    

    const handleSubcategorySelect = (projectId, subcategoryName) => {
        const projectSubcategories = selectedSubcategoryNames[projectId] || [];
        if (projectSubcategories.includes(subcategoryName)) {
            setSelectedSubcategoryNames({
                ...selectedSubcategoryNames,
                [projectId]: projectSubcategories.filter(name => name !== subcategoryName)
            });
        } else {
            setSelectedSubcategoryNames({
                ...selectedSubcategoryNames,
                [projectId]: [...projectSubcategories, subcategoryName]
            });
        }
    };

    const handleDescriptionChange = (projectId, subcategoryName, description) => {
        setDescriptions({
            ...descriptions,
            [`${projectId}_${subcategoryName}`]: description
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const reports = selectedProjectIds.map((projectId) => {
                const subcategoryReports = selectedSubcategoryNames[projectId]?.map(subcategoryName => ({
                    subcategoryName,
                    description: descriptions[`${projectId}_${subcategoryName}`] || ''
                })) || [];
        
                return {
                    projectId, // Use project ID here
                    subcategoryReports
                };
            });
        
            const response = await axios.post('http://localhost:9000/api/reports', {
                reports
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
            setMessage(response.data.message);
            setError('');
            setSelectedProjectIds([]);
            setSelectedSubcategoryNames({});
            setDescriptions({});
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Session expired. Please log in again.');
                // Handle token refresh or redirect to login
            } else {
                setError(error.response ? error.response.data.error : 'An error occurred');
            }
            setMessage('');
        }
    };
    
    return (
        <Container>
            <h2>Submit Reports</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {projects.map((project) => (
                        <Col key={project.project.id} md={4}>
                            <Card
                                onClick={() => handleProjectSelect(project.project.id)}
                                className={selectedProjectIds.includes(project.project.id) ? 'border-primary' : ''}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Body>
                                    <Card.Title>{project.project.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {selectedProjectIds.length > 0 && (
                    <>
                        {selectedProjectIds.map((projectId) => {
                            const project = projects.find(p => p.project.id === projectId);
                            return (
                                <div key={projectId}>
                                    <h3>{project.project.name} - Subcategories</h3>
                                    <Row>
                                        {project.subcategories.map(subcategory => (
                                            <Col key={subcategory.name} md={3}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={subcategory.name}
                                                    value={subcategory.name}
                                                    onChange={() => handleSubcategorySelect(projectId, subcategory.name)}
                                                    checked={selectedSubcategoryNames[projectId]?.includes(subcategory.name)}
                                                />
                                                {selectedSubcategoryNames[projectId]?.includes(subcategory.name) && (
                                                    <Form.Group className="mt-3">
                                                        <Form.Label>Description for {subcategory.name}</Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            value={descriptions[`${projectId}_${subcategory.name}`] || ''}
                                                            onChange={(e) => handleDescriptionChange(projectId, subcategory.name, e.target.value)}
                                                            required
                                                        />
                                                    </Form.Group>
                                                )}
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            );
                        })}
                        <Button variant="success" type="submit" className="mt-3">Submit Reports</Button>
                    </>
                )}
            </Form>
        </Container>
    );
};

export default SubmitReport;
