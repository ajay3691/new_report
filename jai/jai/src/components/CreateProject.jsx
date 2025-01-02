import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CreateProjects = () => {
  const [projects, setProjects] = useState([{ projectName: '', subcategories: [''] }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    if (name === 'projectName') {
      updatedProjects[index].projectName = value;
    } else {
      updatedProjects[index].subcategories[parseInt(name, 10)] = value;
    }
    setProjects(updatedProjects);
  };

  const handleAddSubcategory = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].subcategories.push('');
    setProjects(updatedProjects);
  };

  const handleRemoveSubcategory = (projectIndex, subcategoryIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].subcategories.splice(subcategoryIndex, 1);
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects1`,
        { projects }
      );
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setSuccess('');
    }
  };

  const handleAddProject = () => {
    setProjects([...projects, { projectName: '', subcategories: [''] }]);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <Container className="mt-5">
      <h2>Create Projects and Subcategories</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-4">
            <Row>
              <Col>
                <Form.Group controlId={`projectName-${projectIndex}`}>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={project.projectName}
                    onChange={(e) => handleProjectChange(projectIndex, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button
                  variant="danger"
                  className="mt-4"
                  onClick={() => handleRemoveProject(projectIndex)}
                >
                  Remove Project
                </Button>
              </Col>
            </Row>
            {project.subcategories.map((subcategory, subcategoryIndex) => (
              <Row key={subcategoryIndex} className="mb-2">
                <Col>
                  <Form.Group controlId={`subcategory-${projectIndex}-${subcategoryIndex}`}>
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Control
                      type="text"
                      name={subcategoryIndex.toString()}
                      value={subcategory}
                      onChange={(e) => handleProjectChange(projectIndex, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="danger"
                    className="mt-4"
                    onClick={() => handleRemoveSubcategory(projectIndex, subcategoryIndex)}
                  >
                    Remove Subcategory
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="primary"
              className="mb-4"
              onClick={() => handleAddSubcategory(projectIndex)}
            >
              Add Subcategory
            </Button>
          </div>
        ))}
        <Button
          variant="success"
          className="mb-4"
          onClick={handleAddProject}
        >
          Add Project
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProjects;
