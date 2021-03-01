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
      postMock.mockResolvedValue(data);

      const created = await flowsManager.createFlow(data);

      expect(created).toMatchObject(data);
    });

    it('rejects if service is not available', async () => {
      const data = createFakeFlow();
      postMock.mockRejectedValue(new Error());

      const createPromise = flowsManager.createFlow(data);

      await expect(createPromise).rejects.toThrow(Error);
    });
  });
});
