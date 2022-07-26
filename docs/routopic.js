module.exports = {
  paths: {
    "/users": {
      get: {
        tags: {
          Usuarios: " Obtener usuarios",
        },
        description:
          "Obtener todos los usuarios registrados en la base de datos",
        operationId: "getUsers",
        parameters: [],
        responses: {
          200: {
            description: "Se han obtenido los usuarios",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userGet",
                },
              },
            },
          },
          500: { description: "Error de servidor" },
        },
      },

      post: {
        tags: {
          Usuarios: " Registrar usuarios",
        },
        description:
          " Crear un nuevo usuario (los campos 'name', 'password' y 'email' son obligatorios)",
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
          200: { description: "Usuario creado correctamente" },
          500: { description: "Error de servidor" },
        },
      },

      delete: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usuarios: "Eliminar usuario",
        },
        description: "Eliminar un usuario",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "Usuario eliminado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" },
        },
      },

      put: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usarios: " Actualizar usuario",
        },
        description: "Actualizar los datos del perfil del usuario",
        operationId: "updateUser",
        parameters: [],
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
          200: { description: "Usuario actualizado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" },
        },
      },
    },

    "/users/login": {
      post: {
        tags: {
          Usuario: " LogIn de usuario",
        },
        description: "Conecta al usuario",
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
          200: { description: "Usuario conectado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" },
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
          Usuarios: " LogOut de usuario",
        },
        description: "Desconecta al usuario",
        operationId: "deleteUser",
        parameters: [],
        responses: {
          200: { description: "Usuario desconectado correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" },
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
          Usuarios: "Información del usuario",
        },
        description: "Obtiene la información del usuario conectado",
        operationId: "infoUser",
        parameters: [],
        responses: {
          200: { description: "Información obtenida correctamente" },
          404: { description: "No se encontró el usuario" },
          500: { description: "Error de servidor" },
        },
      },
    },

    "/comments": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Comentarios: " Obtener comentarios",
        },
        description: "Obtener todos los comentarios de la base de datos",
        operationId: "getComments",
        parameters: [],
        responses: {
          200: {
            description: "Se han obtenido los comentarios",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/commentGet",
                },
              },
            },
          },
        },
      },
    },
    "/comments/route/{routeId}": {
      post: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Comentarios: " Crear comentario",
        },
        description: "Crear un nuevo comentario",
        operationId: "createComments",
        parameters: [
          {
            in: "path",
            name: "routeId",
            schema: {
              type: "objectId",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/commentCreate",
              },
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/commentCreate",
              },
            },
          },
        },
        responses: {
          200: { description: "Comentario creado correctamente" },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/comments/comment/{commentId}": {
      put: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Comenatrios: " Actualizar comentario",
        },
        description: "Editar el comentario",
        operationId: "updateComment",
        parameters: [
          {
            in: "path",
            name: "commentId",
            schema: {
              type: "objectId",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/commentUpdate",
              },
            },
            "image/jpg": {
              schema: {
                $ref: "#/components/schemas/commentUpdate",
              },
            },
          },
        },
        responses: {
          200: { description: "Comentario actualizado correctamente" },
          404: { description: "No se encontró el comentario" },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/comments/comment/{_Id}": {
      delete: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Comentarios: " Eliminar comentario",
        },
        description: "Eliminar un comentario",
        operationId: "deleteComment",
        parameters: [
          {
            in: "path",
            name: "_Id",
            schema: {
              type: "objectId",
            },
          },
        ],
        responses: {
          200: { description: "Comentario eliminado correctamente" },
          404: { description: "No se encontró el comentario" },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/routes": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Rutas: " Obtener rutas",
        },
        description: "Obtener las rutas",
        operationId: "getRoutes",
        parameters: [],
        responses: {
          200: {
            description: "Se han obtenido las rutas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getRoutes",
                },
              },
            },
          },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/routes/route/{_Id}": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Rutas: " Obtener ruta por id",
        },
        description: "Encontrar la ruta",
        operationId: "Encontrar ruta",
        parameters: [
          {
            in: "path",
            name: "_Id",
            schema: {
              type: "objectId",
            },
          },
        ],
        responses: {
          200: {
            description: "Se ha obtenido la ruta",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getRouteById",
                },
              },
            },
          },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/routes/likes/{_Id}": {
      put: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Rutas: " Dar like a ruta",
        },
        description: "Dar like",
        operationId: "Like a ruta",
        parameters: [
          {
            in: "path",
            name: "_Id",
            schema: {
              type: "objectId",
            },
          },
        ],
        responses: {
          200: { description: "Se ha dado like a la ruta" },
          404: { description: "No se encontró la ruta" },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/routes/dislike/{_Id}": {
      put: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Rutas: " Dar dislike a ruta",
        },
        description: "Dar dislike",
        operationId: "Dislike a ruta",
        parameters: [
          {
            in: "path",
            name: "_Id",
            schema: {
              type: "objectId",
            },
          },
        ],
        responses: {
          200: { description: "Se ha dado dislike a la ruta" },
          404: { description: "No se encontró la ruta" },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/routes/search/{transport}": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Rutas: " filtrar por transporte",
        },
        description: "Filtra ruta a pie o en bici",
        operationId: "Transporte",
        parameters: [
          {
            in: "path",
            name: "transport",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Se ha obtenido la ruta",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getRoutes",
                },
              },
            },
          },
          500: { description: "Error de servidor" },
        },
      },
    },
    "/scores/": {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Usuarios: " Obtener puntuaciones",
        },
        description: "Obtener las puntuaciones de los usuarios",
        operationId: "getscores",
        parameters: [],
        responses: {
          200: {
            description: "Se han obtenido los usuarios",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getScores",
                },
              },
            },
          },
          500: { description: "Error de servidor" },
        },
      },
    },
  },
};
