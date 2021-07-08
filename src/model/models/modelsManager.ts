import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { FlowsManager } from '../../flow/models/flowsManager';
import { JobsManager } from '../../job/models/jobsManager';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import { Job } from '../../common/models/job';
import { Model } from '../../common/models/model';
import { Payload } from '../../common/models/payload';

@injectable()
export class ModelsManager {
  public constructor(
    @inject(Services.LOGGER) private readonly logger: ILogger,
    private readonly jobs: JobsManager,
    private readonly flows: FlowsManager
  ) {}

  public async createModel(payload: Payload): Promise<Model> {
    this.logger.log('info', `*** Create Model ***`);
    const modelId = uuid();
    const createdJob: Job = await this.jobs.createJob({ resourceId: modelId, parameters: payload });
    try{
      const createdFlow: Flow = await this.flows.createFlow({ ...payload, jobId: createdJob.id });
      return { ...createdFlow, modelId };
    } catch (error) {
      await this.jobs.updateJobStatus(createdJob.id, "Failed");
      throw error;
    }
  }
}
