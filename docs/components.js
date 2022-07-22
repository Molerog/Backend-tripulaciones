module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
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
            // example: "Germán", // esto lo comento porque creo que está repetido
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

      routeGet: {
        type: "object",
        properties: {
          _id: {
            type: "objectId",
            description: "ID de la ruta",
            example: "62da9c9598a6c100c33431c5"
          },
          name: {
            type: "string",
            description: "Nombre de la ruta",
            example: "Arbres monumentals i singulars"
          },
          dificulty: {
            type: "string",
            description: "Dificultad de la ruta",
            example: "baja"
          },
          duration: {
            type: "number",
            description: "Duración de la ruta en minutos",
            example: "120"
          },
          description_es: {
            type: "string",
            description: "Descripción de la ruta",
            example: "La presencia de Árboles Monumentales y Singulares en la ciudad de València, refleja el espíritu de personas, muchas anónimas, que apostaron para conservar y proteger a unos de los seres vivos más longevos del Planeta, y la capacidad del cual de crecer durante toda su vida nos permite hoy en día sorprendernos con sus dimensiones o por características que nada tienen que ver con las medidas sino con sus rarezas, su forma peculiar, los hechos históricos asociados a ellos o porque son especies únicas. Han recorrido enormes distancias desde rincones lejanos de todo el mundo, para llegar hasta aquí. Dar la vuelta en el mundo en una mañana, a los Jardines del Real (Viveros), es posible gracias a estos árboles."
          },
          transport: {
            type: "string",
            description: "Transporte con el cual se puede realizar la ruta",
            example: "bicicleta"
          },
          type: {
            type: "string",
            description: "Tipo de ruta",
            example: "Històrica"
          },
          commentsId: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "objectId",
                  description: "ID del comentario de la ruta",
                  example: "62da9f77ce3eede35a8f8ed6"
                },
                body: {
                  type: "string",
                  description: "Cuerpo del comentario de la ruta",
                  example: "hola probando el value"
                },
                userId: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "objectId",
                      description: "ID del usuario",
                      example: "62da83285999b1268a055f49"
                    },
                    name: {
                      type: "string",
                      description: "Nombre del usuario",
                      example: "Germán"
                    },
                    email: {
                      type: "string",
                      description: "Email del usuario",
                      example: "moltorger@gmail.com"
                    },
                    password: {
                      type: "string",
                      description: "Contraseña hasheada del usuario",
                      example: "$2a$10$u3QYAjM9If/2XMZFRj4ds.I7TPhmXI2PPlSFkWwgbwgqQd7/MsDnC"
                    },
                    genre: {
                      type: "string",
                      description: "Género del usuario",
                      example: "men"
                    },
                    commentsId: {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    },
                    scoresId: {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    },
                    role: {
                      type: "string",
                      description: "Rol del usuario",
                      example: "Admin"
                    },
                    confirmed: {
                      type: "boolean"
                    },
                    imagepath: {
                      type: "string",
                      description: "Imagen del usuario",
                      example: "1658504117342-Radec.jpg"
                    },
                    tokens: {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    },
                    likes: {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    }
                  }
                },
                routeId: {
                  type: "string",
                  description: "ID de la ruta",
                  example: "62da9c9598a6c100c33431c5"
                },
                likes: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                scoresId: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
              // queda más por poner pero no sé si es que no lo estoy haciendo bien o es que es así de difícil
            },
            description: "Comentarios de la ruta",
            // example: "" No sé qué poner aquí
          },
        }
      }
    }
  }
}