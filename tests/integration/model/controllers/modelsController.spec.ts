import httpStatusCodes from 'http-status-codes';
import mockAxios from 'jest-mock-axios';
import { container } from 'tsyringe';
import { convertToISOTimestamp, createMetadata, createModelPath } from '../../../helpers/helpers';
import { registerTestValues } from '../../testContainerConfig';
import * as requestSender from './helpers/requestSender';

describe('ModelsController', function () {
  beforeAll(function () {
    registerTestValues();
    requestSender.init();
  });
  afterEach(function () {
    container.reset();
    mockAxios.reset();
  });

  describe('POST /models', function () {
    describe('Happy Path 🙂', function () {
      it('should return 201 status code and the added model', async function () {
        const validRequest = { modelPath: createModelPath(), metadata: createMetadata() };
        const integrationMetadata = convertToISOTimestamp(validRequest.metadata);
        const model = { ...validRequest };
        mockAxios.post.mockResolvedValue({ data: model });

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.CREATED);
        expect(response.body).toHaveProperty('modelPath', validRequest.modelPath);
        expect(response.body).toHaveProperty('metadata', integrationMetadata);
      });
    });

    describe('Bad Path 😡', function () {
      it('should return 400 status code and error message if model path field is missing', async function () {
        const invalidRequest = { metadata: createMetadata() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'modelPath'");
      });
      it('should return 400 status code and error message if metadata field is missing', async function () {
        const invalidRequest = { modelPath: createModelPath() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'metadata'");
      });
    });

    describe('Sad Path 😥', function () {
      it('should return 500 status code if a network exception happens', async function () {
        const validRequest = { modelPath: createModelPath(), metadata: createMetadata() };
        mockAxios.post.mockRejectedValue(new Error('Service is not available'));

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('message', 'Service is not available');
      });
    });
  });
});
