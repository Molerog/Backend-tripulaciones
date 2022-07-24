module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      },
    },
    schemas: {
      userGet: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "ID del usuario",
            example: "6201064b0028de7866e2b2c4"
          },
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Germán"
          },
          email: {
            type: "string",
            description: "Email del usuario",
            example: "test@gmail.com"
          },
          role: {
            type: "string",
            description: "Rol del usuario",
            example: "User"
          }
        }
      },
      userCreate: {
        type: "object",
        properties: {
          password: {
            type: "string",
            description: "Contraseña del usuario",
            example: "123456"
          },
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Germán",
            required: true,
          },
          email: {
            type: "string",
            description: "Email del usuario",
            example: "test@gmail.com",
            required: true,
            unique: true
          },
          imageUser: {
            type: "string",
            format: "binary",
            example: "1657907225788-Resident Evil.jpg",
          },
          genre: {
            type: "string",
            description: "Género del usuario",
            required: true,
            example: "Male"
          },
        },
      },
      userUpdate: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Ger"
          },
          email: {
            type: "string",
            description: "Email del usuario",
            example: "test@gmail.com",
            required: true,
            unique: true
          },
          imageUser: {
            type: "string",
            format: "binary",
            example: "1657907225788-Resident Evil.jpg"
          },
          genre: {
            type: "string",
            description: "Género del usuario",
            required: true,
            example: "Other"
          },
        },
      },
      _id: {
        type: "objectId",
        description: "ID del usuario",
        example: "629f5529328f820b7dfe17cf",
      },
      userLogin: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email del usuario",
            example: "mol@gmail.com",
            required: true
          },
          password: {
            type: "string",
            description: "Contraseña del usuario",
            example: "123456",
            required: true
          }
        }
      }
    }
  }
}