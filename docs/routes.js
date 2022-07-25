module.exports = {
    paths: {
        "/routes": {
            get: {
                security: [{
                    ApiKeyAuth: [ ]
                  }],
          
                tags: {
                    Routes: "Get Routes",
                },
                description: "Get routes",
                operationId: "getRoutes",
                parameters: [],
                responses: {
                    200: {
                        description: "Se obtuvieron las rutas",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/route"
                                }
                            }
                        }
                    }
                }
            }
        },

        post: {
            tags: {
                Tasks: "Create a route",
            },
            description: "Create Routes",
            operationId: "createRoutes",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RoutesInput",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Task created successfully",
                },
                500: {
                    description: "Server error",
                },
            },
        },

        "/routes/{_id}": {
            put: {
                security: [{
                    ApiKeyAuth: [ ]
                  }],
          
                tags: {
                    Routes: "Update a route",
                },
                description: "Update Route",
                operationId: "updateRoute",
                parameters: [
                    {
                        name: "_id",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/_id",
                        },
                        description: "Id of Route to be updated",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/RouteInput" },
                        },
                    },
                },
                responses: {
                    200: { description: "Task updated successfully" },
                    404: { description: "Task not found" },
                    500: { description: "Server error" },
                },
            },
        },

    }
}