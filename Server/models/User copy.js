import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path to your sequelize instance

class ProjectSubcategory extends Model {}

ProjectSubcategory.init({
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects', // Assuming you have a Projects model
      key: 'id'
    }
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subcategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ProjectSubcategory'
});

export default ProjectSubcategory;
