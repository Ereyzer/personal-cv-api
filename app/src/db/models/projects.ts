import mongoose from 'mongoose';

const ProjectsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      auto: true,
    },
    image: {
      url: {
        type: mongoose.Schema.Types.String,
        require: false,
        default: null,
      },
      public_id: {
        type: mongoose.Schema.Types.String,
        require: false,
        default: null,
      },
    },
    technology: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hard_skills',
      },
    ],
    github: {
      type: mongoose.Schema.Types.String,
      require: false,
      default: null,
    },
    link: {
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
    title: {
      type: mongoose.Schema.Types.String,
      require: false,
      default: null,
    },
    description: {
      type: mongoose.Schema.Types.String,
      require: false,
      default: null,
    },
  },
  { timestamps: true }
);

export const ProjectsCollection = mongoose.model('projects', ProjectsSchema);
export const EnProjectsCollection = mongoose.model('enprojects', LanguageProjectsSchema);
export const UkProjectsCollection = mongoose.model('ukproekts', LanguageProjectsSchema);
