import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { RequestMethods } from './RequestMethodsEnum';
import { MetaDataKeys } from './MetaDataKeys';
import { NextFunction, RequestHandler, Response, Request } from 'express';

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Body Request Is Required.');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`${key} is required.`);
        return;
      }
    }

    next();
  };
}

export function Controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetaDataKeys.path,
        target.prototype,
        key
      );
      const method: RequestMethods = Reflect.getMetadata(
        MetaDataKeys.method,
        target.prototype,
        key
      );
      const middlewares: Array<RequestHandler> =
        Reflect.getMetadata(MetaDataKeys.middleware, target.prototype, key) ||
        [];

      const validators =
        Reflect.getMetadata(MetaDataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(validators);

      if (path != undefined) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
