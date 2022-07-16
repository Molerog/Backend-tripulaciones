module.exports = {
  paths: {
    "/users": {
      get: {
        tags: {
          Usuarios: " Obtener usuarios",
        },
        description:
          "Obtiene todos los usuarios registrados en la base de datos",
        operationId: "getUsers",
        parameters: [],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userGet",
                },
              },
            },
          },
        },
      },
      post: {
        tags: {
          Usuarios: " Registrar usuarios",
        },
        description:
          "Endpoint para crear usuario, los campos 'name', 'password' y 'email' son obligatorios",
        operationId: "createUsers",
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/userCreate",
              },
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/userCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          500: {
            description: "Server error",
          },
        },
      },
      delete: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usuarios: " Borrar usuario",
        },
        description: "Deleting a User",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "User deleted successfully" },
          404: { description: "User not found" },
          500: { description: "Server error" },
        },
      },
      put: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usarios: " Actualizar perfil de usuario",
        },
        description: "Update User",
        operationId: "updateUser",
        parameters: [
          //   {
          //     name: "_id",
          //     in: "path",
          //     schema: {
          //       $ref: "#/components/schemas/_id",
          //     },
          //     description: "Update the user logged",
          //   },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/userUpdate",
              },
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/userUpdate",
              },
            },
          },
        },
        responses: {
          200: { description: "User updated successfully" },
          404: { description: "User not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/users/login": {
      post: {
        tags: {
          Usuario: " Login de usuario",
        },
        description: "Loguea al usuario",
        operationId: "loginUser",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/userLogin",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Usuario logueado",
          },
          404: { description: "Usuario no encontrado" },
          500: { description: "Error de servido" },
        },
      },
    },
    "/users/logout": {
      delete: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usuarios: " Logout de usuario",
        },
        description: "Elimina al usuario",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "User deleted successfully" },
          404: { description: "User not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/users/info": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usuarios: " Información del usuario conectado",
        },
        description: "Obtiene información",
        operationId: "infoUser",
        parameters: [],
        responses: {
          200: { description: "User deleted successfully" },
          404: { description: "User not found" },
          500: { description: "Server error" },
        },
      },
    },
    // "/users/confirm/:{emailToken}": {
    //   get: {
    //     security: [
    //       {
    //         JWT: [],
    //       },
    //     ],
    //     tags: {
    //       Usuarios: "Confirmación de email",
    //     },
    //     description: "Confirmación de usuario",
    //     operationId: "confirmUser",
    //     parameters: [
    //       {
    //         name: "emailToken",
    //         in: "path",
    //         schema: {
    //             $ref: "#/components/schemas/emailToken",
    //         },
    //       },
    //     ],
    //   },
    // },
  },
};
