import 'reflect-metadata';
import { RequestMethods } from './RequestMethodsEnum';
import { MetaDataKeys } from './MetaDataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDiscriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: RequestMethods) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDiscriptor) {
      Reflect.defineMetadata(MetaDataKeys.path, path, target, key);
      Reflect.defineMetadata(MetaDataKeys.method, method, target, key);
    };
  };
}

export const GET = routeBinder(RequestMethods.GET);
export const POST = routeBinder(RequestMethods.POST);
export const PUT = routeBinder(RequestMethods.PUT);
export const DELETE = routeBinder(RequestMethods.DELETE);
export const PATCH = routeBinder(RequestMethods.PATCH);
