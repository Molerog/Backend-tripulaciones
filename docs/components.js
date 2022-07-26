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
            description: "ID del usuario",
            example: "6201064b0028de7866e2b2c4",
          },
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Germán",
          },
          email: {
            type: "string",
            description: "Email del usuario",
            example: "test@gmail.com",
          },
          role: {
            type: "string",
            description: "Rol del usuario",
            example: "User",
          },
        },
      },
      userCreate: {
        type: "object",
        properties: {
          password: {
            type: "string",
            description: "Contraseña del usuario",
            example: "123456",
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
            unique: true,
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
            example: "Male",
          },
        },
      },
      userUpdate: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Ger",
          },
          email: {
            type: "string",
            description: "Email del usuario",
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
            description: "Género del usuario",
            required: true,
            example: "Other",
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
            example: "test@gmail.com",
            required: true,
          },
          password: {
            type: "string",
            description: "Contraseña del usuario",
            example: "123456",
            required: true,
          },
        },
      },

      getRoutes: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "ID de la ruta",
            example: "62da9c9598a6c100c33431c5",
          },
          name: {
            type: "string",
            description: "Nombre de la ruta",
            example: "Arbres monumentals i singulars",
          },
          dificulty: {
            type: "string",
            description: "Dificultad de la ruta",
            example: "baja",
          },
          duration: {
            type: "number",
            description: "Duración de la ruta en minutos",
            example: "120",
          },
          description_es: {
            type: "string",
            description: "Descripción de la ruta",
            example:
              "La presencia de Árboles Monumentales y Singulares en la ciudad de València, refleja el espíritu de personas, muchas anónimas, que apostaron para conservar y proteger a unos de los seres vivos más longevos del Planeta, y la capacidad del cual de crecer durante toda su vida nos permite hoy en día sorprendernos con sus dimensiones o por características que nada tienen que ver con las medidas sino con sus rarezas, su forma peculiar, los hechos históricos asociados a ellos o porque son especies únicas. Han recorrido enormes distancias desde rincones lejanos de todo el mundo, para llegar hasta aquí. Dar la vuelta en el mundo en una mañana, a los Jardines del Real (Viveros), es posible gracias a estos árboles.",
          },
          transport: {
            type: "string",
            description: "Transporte con el cual se puede realizar la ruta",
            example: "bicicleta",
          },
          type: {
            type: "string",
            description: "Tipo de ruta",
            example: "Històrica",
          },
        },
      },
      getRouteById: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "ID de la ruta",
            example: "62da9c9598a6c100c33431c5",
          },
          name: {
            type: "string",
            description: "Nombre de la ruta",
            example: "Arbres monumentals i singulars",
          },
          dificulty: {
            type: "string",
            description: "Dificultad de la ruta",
            example: "baja",
          },
          duration: {
            type: "number",
            description: "Duración de la ruta en minutos",
            example: "120",
          },
          description_es: {
            type: "string",
            description: "Descripción de la ruta",
            example:
              "La presencia de Árboles Monumentales y Singulares en la ciudad de València, refleja el espíritu de personas, muchas anónimas, que apostaron para conservar y proteger a unos de los seres vivos más longevos del Planeta, y la capacidad del cual de crecer durante toda su vida nos permite hoy en día sorprendernos con sus dimensiones o por características que nada tienen que ver con las medidas sino con sus rarezas, su forma peculiar, los hechos históricos asociados a ellos o porque son especies únicas. Han recorrido enormes distancias desde rincones lejanos de todo el mundo, para llegar hasta aquí. Dar la vuelta en el mundo en una mañana, a los Jardines del Real (Viveros), es posible gracias a estos árboles.",
          },
          transport: {
            type: "string",
            description: "Transporte con el cual se puede realizar la ruta",
            example: "bicicleta",
          },
          type: {
            type: "string",
            description: "Tipo de ruta",
            example: "Històrica",
          },
        },
      },

      commentGet: {
        type: "object",
        properties: {
          Number_of_comments: {
            type: "number",
            description: "Cantidad total de comentarios publicados",
            example: "1",
          },
          comments: {
            type: "string",
            description: "Comentario",
            example: "wioiej",
          },
        },
      },
      commentCreate: {
        type: "object",
        parameters: {
          type: "objectId",
        },
        properties: {
          body: {
            type: "string",
            description: "Comentario",
            example: "Hola",
          },
          imageComment: {
            type: "string",
            format: "binary",
            example: "1657907225788-Resident Evil.jpg",
          },
        },
      },
      commentUpdate: {
        type: "object",
        properties: {
          body: {
            type: "string",
            description: "Comentario editado",
            example: "Comentario modificado",
          },
          imageComment: {
            type: "string",
            format: "binary",
            example: "1658745427746-OriolHome.jpeg",
          },
        },
      },
      commentId: {
        type: "objectId",
        description: "ID del comentario",
        example: "62de80b5d429080163f7c40e",
      },
      getScores: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "ID de la puntuación",
            example: "62dd568a6b82667a4c0504d5",
          },
          score: {
            type: "number",
            description: "Puntuación del usuario",
            example: "4",
          },
          userId: {
            type: "objectId",
            description: "ID del usuario",
            example: "62dd568a6b82667a4c0504d5",
          },
          name: {
            type: "string",
            description: "nombre del usuario",
            example: "Vanesa",
          },
          email: {
            type: "string",
            description: "email del usuario",
            example: "vanesa@gmail.com",
          },
        },
      },
      createScores: {
        type: "object",
        properties: {
          score: {
            type: "integer",
            description: "Puntuación del usuario",
            example: "4",
          },
        },
      },
      getQuiz: {
        type: "object",
        properties: {
          idForm: {
            type: "objectId",
            description: "Id del formulario del usuario",
            example: "62dee9868558fe10482474bd",
          },
          idUser: {
            type: "objectId",
            description: "Id del usuario",
            example: "62dd562f6b82667a4c0504a4",
          },
          age: {
            type: "number",
            description: "edad del usuario",
            example: "1987",
          },
          gender: {
            type: "string",
            description: "género del usuario",
            example: "hombre",
          },
          routeType: {
            type: "string",
            description: "tipo de ruta",
            example: "patrimonio",
          },
          price: {
            type: "string",
            description: "precio de la ruta",
            example: "gratis",
          },
          difficulty: {
            type: "string",
            description: "dificultad de la ruta",
            example: "baja",
          },
          companions:{
            type: "string",
            description: "acompañantes de la ruta",
            example: "solo"
          },
          transport:{
            type: "string",
            description: "modo de transporte",
            example: "bicicleta"
          }
        },
      },
      createQuiz: {
        type: "object",
        properties: {
          age: {
            type: "number",
            description: "edad del usuario",
            example: "1987",
          },
          gender: {
            type: "string",
            description: "género del usuario",
            example: "hombre",
          },
          routeType: {
            type: "string",
            description: "tipo de ruta",
            example: "patrimonio",
          },
          price: {
            type: "string",
            description: "precio de la ruta",
            example: "gratis",
          },
          difficulty: {
            type: "string",
            description: "dificultad de la ruta",
            example: "baja",
          },
          companions:{
            type: "string",
            description: "acompañantes de la ruta",
            example: "solo"
          },
          transport:{
            type: "string",
            description: "modo de transporte",
            example: "bicicleta"
          },
        },
      },
    },
  },
};
