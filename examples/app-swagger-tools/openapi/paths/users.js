/**
 * This file was generated by mrapi
 * Do not make changes to this file directly
 */

exports.default = function (mrapiFn) {
  async function GET(req, res, next) {
    const data = await mrapiFn.findMany(req, res, next, {
      modelName: 'user',
    })
    if (data.code === 0) {
      res.status(200).json(data)
    } else {
      res.status(500).json(data)
    }
  }
  GET.apiDoc = {
    description: 'Query the users by parameter.',
    operationId: 'getUsers',
    tags: ['users'],
    parameters: [
      {
        name: 'orderBy',
        in: 'query',
        type: 'array',
        items: {
          type: 'string',
          default: 'name:asc',
        },
        required: false,
        description:
          'Lets you order the returned list by any property. Example: name:asc,id:desc',
      },
      {
        name: 'skip',
        in: 'query',
        type: 'integer',
        required: false,
        description:
          'Specifies how many of the returned objects in the list should be skipped.',
        default: 0,
      },
      {
        name: 'take',
        in: 'query',
        type: 'integer',
        required: false,
        description:
          'Specifies how many objects should be returned in the list (as seen from the beginning (+ve value) or end (-ve value) either of the list or from the cursor position if mentioned)',
        default: 10,
      },
      {
        name: 'cursor',
        in: 'query',
        type: 'string',
        required: false,
        description:
          'Specifies the position for the list (the value typically specifies an id or another unique value). Example: id:xxxx',
      },
      {
        name: 'select',
        in: 'query',
        type: 'array',
        items: {
          type: 'string',
        },
        required: false,
        description:
          'Specifies which properties to include on the returned object, but not both at the same time. Example: id,name',
      },
      {
        name: 'include',
        in: 'query',
        type: 'array',
        items: {
          type: 'string',
        },
        required: false,
        description:
          'Specifies which relations should be eagerly loaded on the returned object, but not both at the same time. Example: Post',
      },
      {
        name: 'where',
        in: 'query',
        type: 'string',
        required: false,
        description:
          'Wraps all model fields in a type so that the list can be filtered by any property. reference models: "#/definitions/UserWhereInput" to JSON string.',
      },
    ],
    responses: {
      200: {
        description: 'The list of users that match the parameters.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/User',
          },
        },
      },
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error',
        },
      },
    },
  }
  async function POST(req, res, next) {
    const data = await mrapiFn.create(req, res, next, {
      modelName: 'user',
    })
    if (data.code === 0) {
      res.status(204).json(data)
    } else {
      res.status(500).json(data)
    }
  }
  POST.apiDoc = {
    description: 'Create a new users.',
    operationId: 'createUser',
    tags: ['users'],
    parameters: [
      {
        name: 'data',
        in: 'body',
        schema: {
          $ref: '#/definitions/UserCreateInput',
        },
        required: true,
      },
    ],
    responses: {
      204: {
        description: 'user created successfully.',
        schema: {
          $ref: '#/definitions/User',
        },
      },
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error',
        },
      },
    },
  }
  return {
    GET,
    POST,
  }
}
