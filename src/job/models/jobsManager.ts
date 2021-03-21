import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Job } from '../../common/models/job';
import { Payload } from '../../common/models/payload';

@injectable()
export class JobsManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async createJob(payload: Payload): Promise<Job> {
    this.logger.log('info', `Create a new job: ${JSON.stringify(payload)}`);
    const url = this.config.get<string>('jobUrl');
    const response = await axios.post(url, payload);
    return response.data as Job;
  }
}
