import mongoose from 'mongoose';

const ProjectsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      auto: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      require: false,
      default: null,
    },
  },
  { collection: 'projects', timestamps: true }
);

const LanguageProjectsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'projects',
    },
  },
  { collection: 'projects', timestamps: true }
);

export const ProjectsCollection = mongoose.model('projects', ProjectsSchema);
export const EnProjectsCollection = mongoose.model('enprojects', LanguageProjectsSchema);
export const UkProjectsCollection = mongoose.model('ukproekts', LanguageProjectsSchema);
