import config from 'config';
import { JobsManager } from '../../../../src/job/models/jobsManager';
import { createFakeJob } from '../../../helpers/helpers';
import { Utils } from '../../../../src/common/utils';

describe('JobsManager', () => {
  let jobsManager: JobsManager;
  const postMock = jest.fn();
  beforeEach(() => {
    jobsManager = new JobsManager(config, { log: jest.fn() });
    Utils.post = postMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createJob', () => {
    it('resolves without errors', async () => {
      const data = createFakeJob();
      postMock.mockResolvedValue(data);

      const created = await jobsManager.createJob(data);

      expect(created).toMatchObject(data);
    });

    it('rejects if service is not available', async () => {
      const data = createFakeJob();
      postMock.mockRejectedValue(new Error());

      const createPromise = jobsManager.createJob(data);

      await expect(createPromise).rejects.toThrow(Error);
    });
  });
});
