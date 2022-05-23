import mockAxios from 'jest-mock-axios';
import config from 'config';
import jsLogger from '@map-colonies/js-logger';
import { FlowsManager } from '../../../../src/flow/models/flowsManager';
import { createFakeFlow } from '../../../helpers/helpers';

describe('FlowsManager', () => {
  let flowsManager: FlowsManager;

  beforeEach(() => {

    flowsManager = new FlowsManager(config, jsLogger({ enabled: false }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createFlow', () => {
    it('resolves without errors', async () => {
      const data = createFakeFlow();
      const url = config.get<string>('flowUrl');
      mockAxios.post.mockResolvedValue({ data });

      const created = await flowsManager.createFlow(data);

      expect(mockAxios.post).toHaveBeenCalledWith(url, data);
      expect(created).toMatchObject(data);
    });

    it('rejects if service is not available', async () => {
      const data = createFakeFlow();
      mockAxios.post.mockRejectedValue(new Error('Flow service is not available'));

      const createPromise = flowsManager.createFlow(data);

      await expect(createPromise).rejects.toThrow('Flow service is not available');
    });
  });
});
