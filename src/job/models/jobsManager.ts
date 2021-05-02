import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Job } from '../../common/models/job';
import { JobPayload } from '../../common/models/jobPayload';

@injectable()
export class JobsManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async createJob(payload: JobPayload): Promise<Job> {
    this.logger.log('info', `Create a new job: ${JSON.stringify(payload)}`);
    payload.version = '1';
    payload.type = '3D';
    payload.description = '3D Model Ingestion';
    payload.percentage = 0;
    payload.tasks = [];
    const url = this.config.get<string>('jobUrl');
    const response = await axios.post<Job>(url, payload);
    return response.data;
  }
}
