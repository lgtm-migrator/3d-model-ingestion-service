import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { FlowsManager } from '../../flow/models/flowsManager';
import { JobsManager } from '../../job/models/jobsManager';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import { Job } from '../../common/models/job';
import { Model } from '../../common/models/model';

@injectable()
export class ModelsManager {
  public constructor(
    @inject(Services.LOGGER) private readonly logger: ILogger,
    private readonly jobs: JobsManager,
    private readonly flows: FlowsManager
  ) {}

  public async createModel(model: Model): Promise<Model> {
    this.logger.log('info', `*** Create Model ***`);
    model.modelId = uuid();
    const newJob = { path: model.path, metadata: model.metadata } as Job;
    const createdJob = await this.jobs.createJob(newJob);
    model.jobId = createdJob.jobId;
    const newFlow = { jobId: model.jobId, path: model.path, metadata: model.metadata } as Flow;
    const createdFlow = await this.flows.createFlow(newFlow);
    model.flowId = createdFlow.flowId;
    return model;
  }
}
