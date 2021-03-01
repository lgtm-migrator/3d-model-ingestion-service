import * as supertest from 'supertest';
import { Application } from 'express';

import { container } from 'tsyringe';
import { ServerBuilder } from '../../../../../src/serverBuilder';

export function getApp(): Application {
  const builder = container.resolve<ServerBuilder>(ServerBuilder);
  return builder.build();
}

export async function createModel(app: Application, request: { path?: unknown; metadata?: unknown }): Promise<supertest.Response> {
  return supertest.agent(app).post('/models').set('Content-Type', 'application/json').send(request);
}
