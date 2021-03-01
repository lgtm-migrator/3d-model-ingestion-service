import { Application } from 'express';
import httpStatusCodes from 'http-status-codes';
import { container } from 'tsyringe';
import { convertToISOTimestamp, createMetadata, createPath } from '../../../helpers/helpers';
import { registerTestValues } from '../../testContainerConfig';
import * as requestSender from './helpers/requestSender';

describe('ModelsController', function () {
  let app: Application;

  beforeAll(function () {
    registerTestValues();
    app = requestSender.getApp();
  });
  afterEach(function () {
    container.reset();
  });

  describe('POST /models', function () {
    describe('Happy Path 🙂', function () {
      it('should return 201 status code and the added model', async function () {
        const validRequest = { path: createPath(), metadata: createMetadata() };
        const integrationMetadata = convertToISOTimestamp(validRequest.metadata);

        const response = await requestSender.createModel(app, validRequest);

        expect(response.status).toBe(httpStatusCodes.CREATED);
        expect(response.body).toHaveProperty('path', validRequest.path);
        expect(response.body).toHaveProperty('metadata', integrationMetadata);
      });
    });

    describe('Bad Path 😡', function () {
      it('should return 400 status code and error message if path field is missing', async function () {
        const invalidRequest = { metadata: createMetadata() };

        const response = await requestSender.createModel(app, invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'path'");
      });
      it('should return 400 status code and error message if metadata field is missing', async function () {
        const invalidRequest = { path: createPath() };

        const response = await requestSender.createModel(app, invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'metadata'");
      });
    });

    describe('Sad Path 😥', function () {
      // 5XX - 4XX Errors
    });
  });
});
