export default {
  definition: {
    swagger: '2.0',
    info: {
      description: 'APIs Documetation',
      version: '1.0.0',
      title: 'Swagger APIs',
    },
    host: 'localhost:5000',
    basePath: '/v1',
    tags: [
      {
        name: 'Employee',
        description: 'Operations about employee',
      },
      { name: 'Department', description: 'Operations about department' },
      {
        name: 'Project',
        description: 'Operations about project',
      },
    ],
    schemes: ['http'],
    paths: {
      '/employee': {
        get: {
          tags: ['Employee'],
          summary: 'getting all employee list',
          description: '',
          operationId: 'get',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
          //security: [{ api_key: [] }],
        },
      },
      '/employee/add': {
        post: {
          tags: ['Employee'],
          summary: 'Add a new employee to the database',
          description: '',
          operationId: 'add',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'Employee object that needs to be added to the database',
              required: true,
              schema: { $ref: '#/definitions/Employee' },
            },
          ],
          responses: {
            '200': { description: 'successful operation', schema: { $ref: '#/definitions/Employee' } },
            '400': { description: 'Bad Request' },
          },
        },
        put: {
          tags: ['Employee'],
          summary: 'Update the employee by Id',
          description: 'update the employee details',
          operationId: 'updatebyemployeeId',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'Employee object that needs to be updating to the database',
              required: true,
              schema: { $ref: '#/definitions/Employee' },
            },
          ],
          responses: {
            '200': { description: 'Row(s) updated' },
            '400': { description: 'Invalid Employee ID' },
          },
        },
      },
      '/employee/{employeeId}': {
        get: {
          tags: ['Employee'],
          summary: 'Find employee by ID',
          description: 'Returns a single employee details',
          operationId: 'getbyemployeeId',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'employeeId',
              in: 'path',
              description: 'Returns a single employee details',
              required: true,
              type: 'integer',
              format: 'int64',
            },
          ],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Invalid Employee ID' },
            '404': { description: 'No data found' },
          },
        },
        delete: {
          tags: ['Employee'],
          summary: 'Delete the employee by ID',
          description: 'delete the employee details',
          operationId: 'deletebyemployeeId',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'employeeId',
              in: 'path',
              description: 'delete the employee details',
              required: true,
              type: 'integer',
              format: 'int64',
            },
          ],
          responses: {
            '200': { description: 'Row(s) updated' },
            '400': { description: 'Invalid Employee ID' },
          },
        },
      },
      '/dept': {
        get: {
          tags: ['Department'],
          summary: 'getting all department list',
          description: '',
          operationId: 'deptget',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
        },
      },
      '/dept/add': {
        post: {
          tags: ['Department'],
          summary: 'Add a new department to the database',
          description: '',
          operationId: 'deptadd',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: '',
              required: true,
              schema: { $ref: '#/definitions/Department' },
            },
          ],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
        },
      },
      '/dept/{deptId}': {
        delete: {
          tags: ['Department'],
          summary: 'Delete the department by ID',
          description: 'delete the department details',
          operationId: 'deletebydepartmentId',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'deptId',
              in: 'path',
              description: 'delete the department details',
              required: true,
              type: 'integer',
              format: 'int64',
            },
          ],
          responses: {
            '200': { description: 'Row(s) updated' },
            '400': { description: 'Invalid Department ID' },
          },
        },
      },
      '/project': {
        get: {
          tags: ['Project'],
          summary: 'Fetching all project list',
          description: '',
          operationId: 'projectGet',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
        },
      },
      '/project/add': {
        post: {
          tags: ['Project'],
          summary: 'Add a new project to the database',
          description: '',
          operationId: 'projectAdd',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'project object that needs to be added to the database',
              required: true,
              schema: { $ref: '#/definitions/Proeject' },
            },
          ],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
        },
        put: {
          tags: ['Project'],
          summary: 'update the project to the database',
          description: '',
          operationId: 'projectupdate',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'project object that needs to be update to the database',
              required: true,
              schema: { $ref: '#/definitions/Proeject' },
            },
          ],
          responses: {
            '200': { description: 'successful operation' },
            '400': { description: 'Bad Request' },
          },
        },
      },
      '/project/{projectId}': {
        delete: {
          tags: ['Project'],
          summary: 'Delete the project by ID',
          description: 'delete the project details',
          operationId: 'deletebyprojectId',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'projectId',
              in: 'path',
              description: 'delete the project details',
              required: true,
              type: 'integer',
              format: 'int64',
            },
          ],
          responses: {
            '200': { description: 'Row(s) updated' },
            '400': { description: 'Invalid Department ID' },
          },
        },
      },
    },
    // securityDefinitions: {
    //   api_key: { type: 'apiKey', name: 'api_key', in: 'header' },
    // },
    definitions: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { type: 'object', properties: { message: { type: 'string' } } },
        },
      },
      Employee: {
        type: 'object',
        required: [
          'empId',
          'email',
          'firstName',
          'lastName',
          'address',
          'state',
          'country',
          'fk_projectId',
          'fk_managerId',
          'fk_deptId',
          'joiningDate',
        ],
        properties: {
          empId: { type: 'string', example: 'EMP101' },
          firstName: { type: 'string', example: 'Robert' },
          lastName: { type: 'string', example: 'Rupert' },
          email: { type: 'string', example: 'abc@test.com' },
          address: { type: 'string', example: 'India' },
          state: { type: 'string', example: 'MH' },
          country: { type: 'string', example: 'India' },
          fk_projectId: { type: 'integer', format: 'int64' },
          fk_managerId: { type: 'integer', format: 'int64' },
          fk_deptId: { type: 'integer', format: 'int64' },
          joiningDate: { type: 'string', example: '2022-05-19 00:00:00+05:30' },
        },
      },
      Department: {
        type: 'object',
        required: ['deptname'],
        properties: {
          deptname: { type: 'string', example: 'HR' },
        },
      },
      Proeject: {
        type: 'object',
        required: ['projectcode', 'projectname', 'clientname', 'startdate', 'enddate'],
        properties: {
          projectcode: { type: 'string', example: 'EMP101' },
          projectname: { type: 'string', example: 'Robert' },
          clientname: { type: 'string', example: 'Rupert' },
          startdate: { type: 'string', example: '2022-05-19 00:00:00+05:30' },
          enddate: { type: 'string', example: '2022-06-19 00:00:00+05:30' },
        },
      },
    },
  },
  apis: ['./routes/**/*.ts'],
}
