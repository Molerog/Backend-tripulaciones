module.exports = {
  paths: {
    "/users": {
      get: {
        tags: {
          Usuarios: "Obtener usuarios"
        },
        description: "Obtener todos los usuarios registrados en la base de datos",
        operationId: "getUsers",
        parameters: [],
        responses: {
          200: {
            description: "Se han obtenido los usuarios",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userGet"
                }
              }
            }
          },
          500: { description: "Error de servidor" }
        }
      },

      post: {
        tags: {
          Usuarios: "Registrar usuarios",
        },
        description: "Crear un nuevo usuario (los campos 'name', 'password' y 'email' son obligatorios)",
        operationId: "createUsers",
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/userCreate"
              }
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/userCreate"
              }
            }
          }
        },
        responses: {
          201: { description: "Usuario creado correctamente" },
          500: { description: "Error de servidor" }
        }
      },

      delete: {
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        tags: {
          Usuarios: "Eliminar usuario"
        },
        description: "Eliminar un usuario",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "Usuario eliminado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" }
        }
      },

      put: {
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        tags: {
          Usarios: "Actualizar usuario"
        },
        description: "Actualizar los datos del perfil del usuario",
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
                $ref: "#/components/schemas/userUpdate"
              }
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/userUpdate"
              }
            }
          }
        },
        responses: {
          200: { description: "Usuario actualizado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" }
        }
      }
    },

    "/users/login": {
      post: {
        tags: {
          Usuario: "LogIn de usuario"
        },
        description: "Conecta al usuario",
        operationId: "loginUser",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/userLogin"
              }
            }
          }
        },
        responses: {
          200: {description: "Usuario conectado correctamente"},
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" }
        }
      }
    },

    "/users/logout": {
      delete: {
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        tags: {
          Usuarios: "LogOut de usuario"
        },
        description: "Desconecta al usuario",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "Usuario desconectado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" }
        }
      }
    },

    "/users/info": {
      get: {
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        tags: {
          Usuarios: "Información del usuario"
        },
        description: "Obtiene la información del usuario conectado",
        operationId: "infoUser",
        parameters: [],
        responses: {
          200: { description: "Información obtenida correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" }
        }
      }
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
  }
}