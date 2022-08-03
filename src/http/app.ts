import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import { routes } from "./routes/index";
import { appError } from "@errors/appError";

const App = express();
var cors = require('cors');

App.use(cors());

App.use(cors
({
  origin: '*'
}));

App.use(cors
({
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
}));

App.use(cors
({
  credentials: true,
}));

App.use( express.json() );
App.use( routes );

App.use
(
    (err: Error, request: Request, response: Response, next: NextFunction) => 
    {
  
      if (err instanceof appError) 
      {          
          return  response.status(err.statusCode).json
          ({
            erro: err.error,
            message: err.message,     
            requiredFields: err.requiredFields,
          })            
      }
      return response.status(500).json(
      {
  
        status: "error",
        message: `Internal server error - ${err.message}`,
  
      });
  
    }
);

export { App };