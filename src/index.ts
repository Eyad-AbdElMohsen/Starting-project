import express , { Express }from "express" 
import cors from "cors"
import 'express-async-errors';

// Middleware
import { requestLogger } from "./middlewares/requestLogger";
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";

// Swagger setup
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger-config";

// import Routers


export const app : Express = express();

app.use(express.json())
app.use(requestLogger)
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Swagger documentation
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes


// glopal middleware
app.all('*', notFoundMiddleware)

//err handler
app.use(errorMiddleware)

