import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { Logger } from '@map-colonies/js-logger';
import { FlowsManager } from '../../flow/models/flowsManager';
import { JobsManager } from '../../job/models/jobsManager';
import { SERVICES } from '../../common/constants';
import { Flow } from '../../common/models/flow';
import { Job } from '../../common/models/job';
import { Model } from '../../common/models/model';
import { Payload } from '../../common/models/payload';
import { ValidationManager } from '../../validator/models/validationManager';

@injectable()
export class ModelsManager {
  public constructor(
    @inject(SERVICES.LOGGER) private readonly logger: Logger,
    private readonly validator: ValidationManager,
    private readonly jobs: JobsManager,
    private readonly flows: FlowsManager
  ) {}

  public async createModel(payload: Payload): Promise<Model> {
    this.logger.debug({ msg: 'started ingestion of new model' });
    //TODO: use this id for ingestion- send to NiFi and use this in links. will need to change the request to catalog in post that recieves this id
    const modelId = uuid();
    //change model path from payload
    payload = this.validator.validateModelPath(payload);
    const createdJob: Job = await this.jobs.createJob({ resourceId: modelId, parameters: payload });
    this.logger.info({ msg: 'created job', jobId: createdJob.id });
    try {
      const createdFlow: Flow = await this.flows.createFlow({ ...payload, jobId: createdJob.id });
      return { ...createdFlow, modelId };
    } catch (error) {
      this.logger.error({ msg: 'Error in creating a flow' });
      await this.jobs.updateJobStatus(createdJob.id, { status: 'Failed', reason: 'Connection error to Nifi' });
      throw error;
    }
  }
}
