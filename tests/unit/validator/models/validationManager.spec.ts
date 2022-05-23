import config from 'config';  
import jsLogger from '@map-colonies/js-logger';
import { ValidationManager } from '../../../../src/validator/models/validationManager';
import { Payload } from '../../../../src/common/models/payload';
import { createMetadata, createModelPath, createTilesetFilename, createMountedModelPath, createWrongModelPath } from '../../../helpers/helpers';

describe('ValidationManager', () => {
  let validationManager: ValidationManager;

  beforeEach(() => {
    validationManager = new ValidationManager(config, jsLogger({ enabled: false }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#check model path', () => {
    it('resolves without errors', () => {
      const data: Payload = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      const expected: Payload = { ...data };
      expected['modelPath'] = createMountedModelPath();

      //const expected: Payload = {modelPath: createMountedModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata()}

      const payload = validationManager.validateModelPath(data);

      expect(payload).toMatchObject(expected);
    });

    it('error when model path not in the agreed path', () => {
      const data: Payload = { modelPath: createWrongModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      expect(() => {
        validationManager.validateModelPath(data);
      }).toThrow('Unknown model path- the model isnt in the agreed folder');
    });
  });
});
