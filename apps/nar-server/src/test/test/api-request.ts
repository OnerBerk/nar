import request from 'supertest';
import { INestApplication } from '@nestjs/common';

let appInstance: INestApplication;

export function initApiTestRequest(app: INestApplication) {
  appInstance = app;
}

export function testWithGet(path: string): Promise<request.Response> {
  return request(appInstance.getHttpServer()).get(path);
}

export function testWithPost(path: string, body: object): Promise<request.Response> {
  return request(appInstance.getHttpServer()).post(path).send(body);
}

export function testWithPut(path: string, body: object): Promise<request.Response> {
  return request(appInstance.getHttpServer()).put(path).send(body);
}

export function testWithDelete(path: string): Promise<request.Response> {
  return request(appInstance.getHttpServer()).delete(path);
}
