import config from 'config';
import { Entities } from '../../../../src/common/constants';
import { ModelsManager } from '../../../../src/model/models/modelsManager';
import { createFakeModel } from '../../../helpers/helpers';

describe('ModelsManager', () => {
  let modelsManager: ModelsManager;
  beforeEach(() => {
    modelsManager = new ModelsManager({ log: jest.fn() });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#create', () => {
    it('create new job resolves without errors', async () => {
      const data = createFakeModel();
      const validUrl = config.get<string>(Entities.JOB + 'Url');

      const createPromise = modelsManager.create('', validUrl, data);

      await expect(createPromise).resolves.not.toThrow();
    });

    it('create new flow resolves without errors', async () => {
      const data = createFakeModel();
      const validUrl = config.get<string>(Entities.FLOW + 'Url');

      const createPromise = modelsManager.create('', validUrl, data);

      await expect(createPromise).resolves.not.toThrow();
    });

    it('rejects on create failure', async () => {
      const data = createFakeModel();
      const invalidUrl = config.get<string>(Entities.JOB + 'Url') + 'xxx';

      const createPromise = modelsManager.create('', invalidUrl, data);

      await expect(createPromise).rejects.toThrow();
    });
  });
});
