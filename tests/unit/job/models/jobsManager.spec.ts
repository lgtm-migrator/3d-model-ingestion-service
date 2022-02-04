import mockAxios from 'jest-mock-axios';
import config from 'config';
import { JobsManager } from '../../../../src/job/models/jobsManager';
import { createFakeJobPayload, createFakeJob } from '../../../helpers/helpers';
import { JobUpdatePayload } from '../../../../src/common/models/jobUpdatePayload';

describe('JobsManager', () => {
  let jobsManager: JobsManager;

  beforeEach(() => {
    jobsManager = new JobsManager(config, { log: jest.fn() });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createJob', () => {
    it('resolves without errors', async () => {
      const data = createFakeJobPayload();
      const url = config.get<string>('jobUrl');
      const job = createFakeJob(data);
      mockAxios.post.mockResolvedValue({ data: job });

      const created = await jobsManager.createJob(data);

      expect(mockAxios.post).toHaveBeenCalledWith(url, data);
      expect(created).toMatchObject(job);
    });

    it('rejects if service is not available', async () => {
      const data = createFakeJobPayload();
      mockAxios.post.mockRejectedValue(new Error('Job service is not available'));

      const createPromise = jobsManager.createJob(data);

      await expect(createPromise).rejects.toThrow('Job service is not available');
    });
  });

  describe('#updateJobStatus', () => {
    it('resolves without errors', async () => {
      const data = createFakeJobPayload();
      const url = config.get<string>('jobUrl');
      const job = createFakeJob(data);
      const jobId = job.id;
      const updateUrl = `${url}/${jobId}`;
      mockAxios.put.mockResolvedValue({ string: updateUrl, data: job });

      await jobsManager.updateJobStatus(jobId, data as JobUpdatePayload);

      expect(mockAxios.put).toHaveBeenCalledWith(updateUrl, data);
      // await expect(updated).resolves.toStrictEqual(data);
    });
  });
});
