import httpStatusCodes from 'http-status-codes';
import mockAxios from 'jest-mock-axios';
import { container } from 'tsyringe';
import { Model } from '../../../../src/common/models/model';
import { createInvalidMetadata, createMetadata, createMetadataWithoutProductSource, createModelPath, createTilesetFilename } from '../../../helpers/helpers';
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
        const validRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };
        const model = { ...validRequest, metadata: createMetadata() };
        mockAxios.post.mockResolvedValue({ data: model });

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.CREATED);
        expect(response.body).toHaveProperty('modelPath', validRequest.modelPath);
        expect(response.body).toHaveProperty('tilesetFilename', validRequest.tilesetFilename);
        expect(response.body).toHaveProperty('metadata');
      });

      it('productSource should be equal to modelPath', async function () {
        const validRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };
        const model = { ...validRequest, metadata: createMetadata() };
        model.metadata.productSource = validRequest.modelPath;
        mockAxios.post.mockResolvedValue({ data: model });

        const response = await requestSender.createModel(validRequest);
        expect(response.status).toBe(httpStatusCodes.CREATED);
        const body = response.body as Model;
        expect(body.metadata).toHaveProperty('productSource', validRequest.modelPath);
      });
    });

    describe('Bad Path 😡', function () {
      it('should return 400 status code and error message if model path field is missing', async function () {
        const invalidRequest = { tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'modelPath'");
      });

      it('should return 400 status code and error message if tileset filename field is missing', async function () {
        const invalidRequest = { modelPath: createModelPath(), metadata: createMetadataWithoutProductSource() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'tilesetFilename'");
      });

      it('should return 400 status code and error message if metadata field is missing', async function () {
        const invalidRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'metadata'");
      });

      it('should return 400 status code and error message if metadata is invalid', async function () {
        const invalidRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createInvalidMetadata() };

        const response = await requestSender.createModel(invalidRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
      });

      it('should return 400 status code and error message if region is empty', async function () {
        const validRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };
        validRequest.metadata.region = [];

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', `request.body.metadata.region should NOT have fewer than 1 items`);
      });

      it('should return 400 status code and error message if sensors is empty', async function () {
        const validRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };
        validRequest.metadata.sensors = [];

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', `request.body.metadata.sensors should NOT have fewer than 1 items`);
      });
    });

    describe('Sad Path 😥', function () {
      it('should return 500 status code if a network exception happens', async function () {
        const validRequest = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadataWithoutProductSource() };
        mockAxios.post.mockRejectedValue(new Error('Service is not available'));

        const response = await requestSender.createModel(validRequest);

        expect(response.status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('message', 'Service is not available');
      });
    });
  });
});
