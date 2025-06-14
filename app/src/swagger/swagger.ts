import { APP_DOMAIN } from '../config/constants.ts';

const baseDomain = APP_DOMAIN;

export default JSON.stringify({
  openapi: '3.0.0',
  info: {
    title: 'CV api docs',
    description: 'endpoints for CV api documentation',
  },
  servers: [
    {
      url: baseDomain,
    },
  ],
  tags: [
    {
      name: 'admin',
      description: 'everythink in admin panel',
    },
  ],
  paths: {
    '/admin/info': {
      get: {
        summary: 'Returns basic existing info',
        description: 'Returns basic existing info',
        tags: ['admin'],
        responses: {
          '200': {
            description: 'successfull operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InfoResponse',
                },
              },
            },
          },
          '500': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/internal_server_error',
                },
              },
            },
          },
        },
      },
    },
    '/admin/info/{field}': {
      patch: {
        summary: 'update simple filds in info Doc',
        tags: ['admin'],
        parameters: [
          {
            name: 'field',
            in: 'path',
            description: 'field name for entity',
            required: true,
            example: 'contact_email',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string',
                    example: 'newEmail@gmail.com',
                    required: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/patchInfoField',
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
    '/admin/info/{language}/{field}': {
      patch: {
        description: 'update multilanguges fields',
        tags: ['admin'],
        parameters: [
          {
            name: 'language',
            in: 'path',
            description: 'lenguage of entity',
            required: true,
            example: 'en',
          },
          {
            name: 'field',
            in: 'path',
            description: 'field name for entity',
            required: true,
            example: 'about',
          },
        ],

        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string',
                    example: 'some new text ebout you',
                    required: true,
                  },
                },
              },
            },
          },
        },

        responses: {
          '201': {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/patchMultilangInfoField',
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
    '/admin/files/avatar': {
      post: {
        sumarry: 'update image for avatar',
        tags: ['admin'],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  avatar: {
                    type: 'string',
                    format: 'binary',
                  },
                },
                required: ['avatar'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'File uploaded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        url: {
                          type: 'string',
                          example: 'http://localhost:3000/uploads/1741418972410_myPhoto.jpg',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request, for example missing file',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/admin/files/icons': {
      post: {
        sumarry: 'add svg icons',
        tags: ['admin'],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  icons: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
                required: ['icons'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Files uploaded successfully',
            content: {
              'application/json': {
                type: 'object',
                properties: {
                  status: {
                    type: 'integer',
                    format: 'int32',
                    example: 201,
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          pattern: '^[a-fA-F0-9]{24}$',
                          example: '507f1f77bcf86cd799439011',
                        },
                        name: {
                          type: 'string',
                          example: '1741696598644_smile1.svg',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request, for example missing file',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/admin/softSkills/{id}/{language}': {
      get: {
        summary: 'get soft skill',
        description: 'get one soft skill',
        tags: ['admin'],
        parameters: [
          {
            name: 'language',
            in: 'path',
            description: 'choose language',
            required: true,
            example: 'EN',
          },
          {
            name: 'id',
            in: 'path',
            description: 'choose language',
            required: true,
            example: '67d2b18e785705c6acb80d8a',
          },
        ],
        responses: {
          '200': {
            description: 'Return Soft Skils list with paganation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },

                    data: {
                      type: 'object',
                      example: {
                        _id: '67d2b18e785705c6acb80d8a',
                        title: 'Заголовак скіла',
                        text: 'Текст про скіл',
                        createdAt: '2025-03-13T10:21:02.426Z',
                        updatedAt: '2025-03-13T10:21:02.426Z',
                        __v: 0,
                        icon: '67cf323c48b87d88e19b36bd',
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            content: {
              'application/json': {
                type: 'object',
                properties: {
                  status: {
                    type: 'integer',
                    format: 'int32',
                    example: 200,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        pattern: '^[a-fA-F0-9]{24}$',
                        example: '507f1f77bcf86cd799439011',
                      },
                      icon: {
                        type: 'string',
                        pattern: '^[a-fA-F0-9]{24}$',
                        example: '507f1f77bcf86cd799439011',
                      },
                      createdAt: '2025-03-13T20:13:44.671Z',
                      updatedAt: '2025-03-13T20:13:44.671Z',
                      __v: 0,
                      title: {
                        type: 'string',
                        example: 'Заголовак скіла',
                      },
                      text: {
                        type: 'string',
                        example: 'Текст про скіл',
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
    '/admin/softSkills': {
      post: {
        summary: 'upsert soft skill',
        description: 'upsert one soft skill',
        tags: ['admin'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/newSkillRequestBody',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'File uploaded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          pattern: '^[a-fA-F0-9]{24}$',
                          example: '67d42801b3c46edb0f7b5048',
                        },
                        icon: {
                          type: 'string',
                          pattern: '^[a-fA-F0-9]{24}$',
                          example: '67cf323c48b87d88e19b36bd',
                        },
                        title: {
                          type: 'string',
                          example: 'Заголовак скіла',
                        },
                        text: {
                          type: 'string',
                          example: 'Текст про скіл',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/admin/softSkills/{language}': {
      get: {
        summary: 'get soft skills',
        description: 'Return Soft Skils list with paganation',
        tags: ['admin'],
        parameters: [
          {
            name: 'language',
            in: 'path',
            description: 'choose language',
            required: true,
            example: 'EN',
          },
          {
            $ref: '#/components/parameters/pageParam',
          },
          {
            $ref: '#/components/parameters/perPageParam',
          },
        ],
        responses: {
          '200': {
            description: 'Return Soft Skils list with paganation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },

                    page: {
                      type: 'integer',
                      format: 'int32',
                      example: 1,
                    },
                    perPage: {
                      type: 'integer',
                      format: 'int32',
                      example: 5,
                    },
                    totalItems: {
                      type: 'integer',
                      format: 'int32',
                      example: 100,
                    },
                    totalPages: {
                      type: 'integer',
                      format: 'int32',
                      example: 10,
                    },
                    hasPrevPage: {
                      type: 'boolean',
                      example: false,
                    },
                    hasNextPage: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        example: {
                          _id: '67d2b18e785705c6acb80d8a',
                          title: 'Заголовак скіла',
                          text: 'Текст про скіл',
                          createdAt: '2025-03-13T10:21:02.426Z',
                          updatedAt: '2025-03-13T10:21:02.426Z',
                          __v: 0,
                          icon: '67cf323c48b87d88e19b36bd',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            content: {
              'application/json': {
                type: 'object',
                properties: {
                  status: {
                    type: 'integer',
                    format: 'int32',
                    example: 200,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        pattern: '^[a-fA-F0-9]{24}$',
                        example: '507f1f77bcf86cd799439011',
                      },
                      icon: {
                        type: 'string',
                        pattern: '^[a-fA-F0-9]{24}$',
                        example: '507f1f77bcf86cd799439011',
                      },
                      createdAt: '2025-03-13T20:13:44.671Z',
                      updatedAt: '2025-03-13T20:13:44.671Z',
                      __v: 0,
                      title: {
                        type: 'string',
                        example: 'Заголовак скіла',
                      },
                      text: {
                        type: 'string',
                        example: 'Текст про скіл',
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
    '/admin/hardSkills': {
      get: {
        summary: 'get hard skill',
        description: 'Return Hard Skils list with paganation',
        tags: ['admin'],
        responses: {
          '200': {
            description: 'Return Soft Skils list with paganation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },

                    page: {
                      type: 'integer',
                      format: 'int32',
                      example: 1,
                    },
                    perPage: {
                      type: 'integer',
                      format: 'int32',
                      example: 5,
                    },
                    totalItems: {
                      type: 'integer',
                      format: 'int32',
                      example: 100,
                    },
                    totalPages: {
                      type: 'integer',
                      format: 'int32',
                      example: 10,
                    },
                    hasPrevPage: {
                      type: 'boolean',
                      example: false,
                    },
                    hasNextPage: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        example: {
                          _id: '67d6ccdc770a7bc81eb3a092',
                          image:
                            'https://github.com/github/explore/blob/main/topics/html/html.png?raw=true',
                          title: 'HTML',
                          createdAt: '2025-03-16T13:06:36.050Z',
                          updatedAt: '2025-03-16T14:00:25.262Z',
                          __v: 0,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'add new Hard Skill',
        tags: ['admin'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/newHardSkillRequestBody',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Return Soft Skils list with paganation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },
                    data: {
                      type: 'object',
                      example: {
                        _id: '67d6ccdc770a7bc81eb3a092',
                        image:
                          'https://github.com/github/explore/blob/main/topics/html/html.png?raw=true',
                        title: 'HTML',
                        createdAt: '2025-03-16T13:06:36.050Z',
                        updatedAt: '2025-03-16T14:00:25.262Z',
                        __v: 0,
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
    '/admin/hardSkills/{_id}': {
      put: {
        summary: 'update Hard Skill',
        tags: ['admin'],
        parameters: [
          {
            name: '_id',
            type: 'string',
            in: 'path',
            required: true,
            example: '67d6ccdc770a7bc81eb3a092',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/updateHardSkillRequestBody',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Return Soft Skils list with paganation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      format: 'int32',
                      example: 201,
                    },
                    data: {
                      type: 'object',
                      example: {
                        _id: '67d6ccdc770a7bc81eb3a092',
                        image:
                          'https://github.com/github/explore/blob/main/topics/html/html.png?raw=true',
                        title: 'HTML',
                        createdAt: '2025-03-16T13:06:36.050Z',
                        updatedAt: '2025-03-16T14:00:25.262Z',
                        __v: 0,
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description: 'UNPROCCESSABLE ENTITY',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unprocessable_entity',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    variables: {
      def_en_text: 'some text',
      def_uk_text: 'деякий текст',
      simple_field_enum: ['contact_email', 'likedin', 'github', 'instagram', 'facebook', 'phone'],
      language: ['EN', 'UK'],
    },
    schemas: {
      InfoResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            format: 'int32',
            example: 200,
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'integer',
                format: 'int32',
                example: 1,
              },
              intro: {
                type: 'object',
                properties: {
                  en: {
                    type: 'string',
                    example: {
                      $ref: '#/components/variables/def_en_text',
                    },
                  },
                  uk: {
                    type: 'string',
                    example: {
                      $ref: '#/components/variables/def_uk_text',
                    },
                  },
                },
              },
              about: {
                type: 'object',
                properties: {
                  en: {
                    type: 'string',
                    example: {
                      $ref: '#/components/variables/def_en_text',
                    },
                  },
                  uk: {
                    type: 'string',
                    example: {
                      $ref: '#/components/variables/def_uk_text',
                    },
                  },
                },
              },
              avatar: {
                type: 'string',
                example: 'http://localhost:3000/uploads/1741418972410_myPhoto.jpg',
              },
              contact_email: {
                type: 'string',
                format: 'binary',
                example: null,
              },
              resume_file: {
                type: 'string',
                format: 'binary',
                example: null,
              },
              likedin: {
                type: 'string',
                example: null,
              },
              github: {
                type: 'string',
                example: null,
              },
              instagram: {
                type: 'string',
                example: null,
              },
              facebook: {
                type: 'string',
                example: null,
              },
              phone: {
                type: 'string',
                example: null,
              },
            },
          },
        },
      },
      patchInfoField: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            format: 'int32',
            example: 201,
          },
          data: {
            type: 'object',
            properties: {
              contact_email: {
                type: 'string',
                example: 'newEmail@gmailcom',
              },
            },
          },
          field: {
            type: 'string',
            example: 'contact_email',
          },
        },
      },
      patchMultilangInfoField: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            format: 'int32',
            example: 201,
          },
          data: {
            type: 'object',
            properties: {
              about: {
                type: 'object',
                example: {
                  en: 'some text',
                  uk: 'Деякий текст',
                },
              },
            },
          },
          field: {
            type: 'string',
            example: 'contact_email',
          },
        },
      },
      internal_server_error: {
        example: {
          message: 'some message',
          name: 'INTERNAL SERVER ERROR',
          status: 500,
        },
      },
      unprocessable_entity: {
        example: {
          status: 422,
          name: 'UNPROCESSABLE ENTITY',
          message: '"contact_email" must be a valid email',
        },
      },
      newSkillRequestBody: {
        type: 'object',
        properties: {
          language: {
            type: 'string',
            enum: ['EN', 'UK'],
            example: 'EN',
          },
          skill: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '507f1f77bcf86cd799439011',
              },
              title: {
                type: 'string',
                example: 'Заголовак скіла',
              },
              text: {
                type: 'string',
                example: 'Текст про скіл',
              },
              icon: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '507f1f77bcf86cd799439011',
              },
            },
          },
        },
      },
      newHardSkillRequestBody: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            required: true,
            example: 'HTML',
          },
          image: {
            type: 'string',
            required: false,
            example: 'http://some_link',
          },
        },
      },
      updateHardSkillRequestBody: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            required: false,
            example: 'HTML',
          },
          image: {
            type: 'string',
            required: false,
            example: 'http://some_link',
          },
        },
      },
    },
    parameters: {
      pageParam: {
        name: 'page',
        in: 'query',
        description: 'number of page in entity list',
        require: false,
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      perPageParam: {
        name: 'perPage',
        in: 'query',
        description: 'number of items in retutned list',
        require: false,
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
  },
});
