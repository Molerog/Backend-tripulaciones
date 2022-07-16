module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
      // JWT:{
      //   type: "apiKey",
      //   in: "query",
      //   name: "access_token",
      // }
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
            example: "Germán",
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
            example: "1657907225788-Resident Evil.jpg",
          },
          genre: {
            type: "string",
            description: "user's genre",
            required: true,
            example: "male",
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
            example: "1657907225788-Resident Evil.jpg",
          },
          genre: {
            type: "string",
            description: "user's genre",
            required: true,
            example: "male",
          },
        },
      },
      _id: {
        type: "objectId",
        description: "User's id",
        example: "629f5529328f820b7dfe17cf",
      },
      userLogin: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "email del usuario",
            example: "mol@gmail.com",
            required: true,
          },
          password: {
            type: "string",
            description: "clave del usuario",
            example: "123456",
            required: true,
          },
        },
      },
    },
  },
};
