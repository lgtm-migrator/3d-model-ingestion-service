import { Model } from '../../../../src/common/models/model';
import { ModelsManager } from '../../../../src/model/models/modelsManager';
import { createMetadata, createPath, createUuid } from '../../../helpers/helpers';

describe('ModelsManager', () => {
  let modelsManager: ModelsManager;

  const jobsManagerMock = {
    createJob: jest.fn(),
  };
  const flowsManagerMock = {
    createFlow: jest.fn(),
  };

  beforeEach(() => {
    modelsManager = new ModelsManager({ log: jest.fn() }, jobsManagerMock as any, flowsManagerMock as any);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createModel', () => {
    it('resolves without errors', async () => {
      const data = { path: createPath(), metadata: createMetadata() } as Model;
      const job = { ...data, jobId: createUuid() };
      const flow = { ...job, flowId: createUuid() };
      const model = { ...flow };
      jobsManagerMock.createJob.mockResolvedValue(job);
      flowsManagerMock.createFlow.mockResolvedValue(flow);

      const created = await modelsManager.createModel(data);
      model.modelId = created.modelId;

      expect(created).toMatchObject(model);
    });

    it('rejects if createJob is not available', async () => {
      const data = { path: createPath(), metadata: createMetadata() } as Model;
      const job = { ...data, jobId: createUuid() };
      const flow = { ...job, flowId: createUuid() };
      jobsManagerMock.createJob.mockRejectedValue(new Error());
      flowsManagerMock.createFlow.mockResolvedValue(flow);

      const createPromise = modelsManager.createModel(data);

      await expect(createPromise).rejects.toThrow(Error);
    });

    it('rejects if createFlow is not available', async () => {
      const data = { path: createPath(), metadata: createMetadata() } as Model;
      const job = { ...data, jobId: createUuid() };
      const flow = { ...job, flowId: createUuid() };
      jobsManagerMock.createJob.mockResolvedValue(job);
      flowsManagerMock.createFlow.mockRejectedValue(new Error());

      const createPromise = modelsManager.createModel(data);

      await expect(createPromise).rejects.toThrow(Error);
    });
  });
});
