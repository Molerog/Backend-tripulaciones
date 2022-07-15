module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    schemas: {
      userGet: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "user identification number",
            example: "6201064b0028de7866e2b2c4",
          },
          name: {
            type: "string",
            description: "user's title",
            example: "Germán",
          },
          email: {
            type: "string",
            description: "user's email",
            example: "test@gmail.com",
          },
          role: {
            type: "string",
            description: "user's role",
            example: "user",
          },
        },
      },
      userCreate: {
        type: "object",
        properties: {
          password: {
            type: "string",
            description: "user's password'",
            example: "123456",
          },
          name: {
            type: "string",
            description: "user's name",
            example: "Germán",
            required: true,
          },
          email: {
            type: "string",
            description: "user's email",
            example: "test@gmail.com",
            required: true,
            unique: true,
          },
          imageUser: {
            type: "string",
            format: "binary",
          },
          genre: {
            type: "string",
            description: "user's genre",
            example: "Male",
            required: true,
          },
        },
      },
      userUpdate: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "user's name",
            example: "ger",
            required: true,
          },
        },
      },
      _id: {
        type: "objectId",
        description: "User's id",
        example: "629f5529328f820b7dfe17cf",
      },
    },
  },
};
