import config from 'config';
import { FlowsManager } from '../../../../src/flow/models/flowsManager';
import { createFakeFlow } from '../../../helpers/helpers';
import { Utils } from '../../../../src/common/utils';

describe('FlowsManager', () => {
  let flowsManager: FlowsManager;
  const postMock = jest.fn();
  beforeEach(() => {
    flowsManager = new FlowsManager(config, { log: jest.fn() });
    Utils.post = postMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createFlow', () => {
    it('resolves without errors', async () => {
      const data = createFakeFlow();
      const url = config.get<string>('flowUrl');
      postMock.mockResolvedValue(data);

      const created = await flowsManager.createFlow(data);

      expect(postMock).toHaveBeenCalledWith(url, data);
      expect(created).toMatchObject(data);
    });

    it('rejects if service is not available', async () => {
      const data = createFakeFlow();
      postMock.mockRejectedValue(new Error('Flow service is not available'));

      const createPromise = flowsManager.createFlow(data);

      await expect(createPromise).rejects.toThrow('Flow service is not available');
    });
  });
});
