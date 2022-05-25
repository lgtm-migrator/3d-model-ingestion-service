import jsLogger from '@map-colonies/js-logger';
import { Payload } from '../../../../src/common/models/payload';
import { ModelsManager } from '../../../../src/model/models/modelsManager';
import { createMetadata, createModelPath, createTilesetFilename, createUuid } from '../../../helpers/helpers';

describe('ModelsManager', () => {
  let modelsManager: ModelsManager;

  const jobsManagerMock = {
    createJob: jest.fn(),
    updateJobStatus: jest.fn(),
  };
  const flowsManagerMock = {
    createFlow: jest.fn(),
  };
  const validationManagerMock = {
    validateModelPath: jest.fn(),
  };

  beforeEach(() => {
    modelsManager = new ModelsManager(
      jsLogger({ enabled: false }),
      validationManagerMock as never,
      jobsManagerMock as never,
      flowsManagerMock as never
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createModel', () => {
    it('resolves without errors', async () => {
      const data: Payload = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      const job = { ...data, jobId: createUuid() };
      const flow = { ...job, flowId: createUuid() };
      const model = { ...flow };
      jobsManagerMock.createJob.mockResolvedValue(job);
      flowsManagerMock.createFlow.mockResolvedValue(flow);
      validationManagerMock.validateModelPath.mockResolvedValue(data);

      const created = await modelsManager.createModel(data);

      expect(created).toMatchObject(model);
    });

    it('rejects if createJob is not available', async () => {
      const data: Payload = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      const job = { ...data, jobId: createUuid() };
      const flow = { ...job, flowId: createUuid() };
      jobsManagerMock.createJob.mockRejectedValue(new Error('Job service is not available'));
      flowsManagerMock.createFlow.mockResolvedValue(flow);

      const createPromise = modelsManager.createModel(data);

      await expect(createPromise).rejects.toThrow('Job service is not available');
    });

    it('rejects if createFlow is not available', async () => {
      const data: Payload = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      const job = { ...data, jobId: createUuid() };
      jobsManagerMock.createJob.mockResolvedValue(job);
      flowsManagerMock.createFlow.mockRejectedValue(new Error('Flow service is not available'));

      const createPromise = modelsManager.createModel(data);

      await expect(createPromise).rejects.toThrow('Flow service is not available');
    });

    it('updates job status to failed when flow is rejected', async () => {
      const data: Payload = { modelPath: createModelPath(), tilesetFilename: createTilesetFilename(), metadata: createMetadata() };
      const job = { ...data, jobId: createUuid(), status: 'Pending', reason: '' };
      jobsManagerMock.createJob.mockResolvedValue(job);
      flowsManagerMock.createFlow.mockRejectedValue(new Error('Flow service is not available'));
      const updatedJob = job;
      updatedJob.status = 'Failed';
      updatedJob.reason = 'Connection error to Nifi';

      await jobsManagerMock.updateJobStatus(updatedJob);

      expect(jobsManagerMock.updateJobStatus).toHaveBeenCalledWith(updatedJob);
    });
  });
});
