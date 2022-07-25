module.exports = {
    paths: {
        "/comments": {
            get: {
                security: [
                    {
                        ApiKeyAuth: []
                    }
                ],
                tags: {
                    Comentarios: "-Obtener comentarios"
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
                                    $ref: "#/components/schemas/commentGet"
                                }
                            }
                        }
                    }
                }
            },

            post: {
                security: [
                    {
                        ApiKeyAuth: []
                    }
                ],
                tags: {
                    Comentarios: "-Crear comentario",
                },
                description: "Crear un nuevo comentario",
                operationId: "createComments",
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/commentCreate"
                            }
                        },
                        "image/jpg": {
                            schema: {
                                $ref: "#/components/schemas/commentCreate"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "Comentario creado correctamente" },
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
                    Comenatrios: "-Actualizar comentario"
                },
                description: "Editar el comentario",
                operationId: "updateComment",
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/commentUpdate"
                            }
                        },
                        "image/jpg": {
                            schema: {
                                $ref: "#/components/schemas/commentUpdate"
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Comentario actualizado correctamente" },
                    404: { description: "No se encontró el comentario" },
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
                    Comentarios: "-Eliminar comentario"
                },
                description: "Eliminar un comentario",
                operationId: "deleteComment",
                parameters: [],
                responses: {
                    200: { description: "Comentario eliminado correctamente" },
                    404: { description: "No se encontró el comentario" },
                    500: { description: "Error de servidor" }
                }
            }
        }
    }
}