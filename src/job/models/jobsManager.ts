import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Job } from '../../common/models/job';

@injectable()
export class JobsManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async createJob(job: Job): Promise<Job> {
    this.logger.log('info', `Create a new job: ${JSON.stringify(job)}`);
    const url = this.config.get<string>('jobUrl');
    const created = await axios.post(url, job);
    return created.data as Job;
  }
}
