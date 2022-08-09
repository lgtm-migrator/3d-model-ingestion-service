import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { IConfig } from '../../common/interfaces';
import { Job } from '../../common/models/job';
import { JobPayload } from '../../common/models/jobPayload';
import { JobUpdatePayload } from '../../common/models/jobUpdatePayload';

@injectable()
export class JobsManager {
  public constructor(@inject(SERVICES.CONFIG) private readonly config: IConfig, @inject(SERVICES.LOGGER) private readonly logger: Logger) {}

  public async createJob(payload: JobPayload): Promise<Job> {
    this.logger.info(`Create a new job: ${JSON.stringify(payload)}`);
    payload.version = '1';
    payload.type = '3D';
    payload.description = '3D Model Ingestion';
    payload.percentage = 0;
    payload.tasks = [];
    const url = this.config.get<string>('jobUrl');
    try{
      const response = await axios.post<Job>(url, payload);
      return response.data;
    }catch(error){
      this.logger.error(`Creating a new job failed with error messege: ${JSON.stringify(error)}`);
      throw error;
    }
   
  }

  public async updateJobStatus(jobId: string, payload: JobUpdatePayload): Promise<void> {
    this.logger.info(`Updating job status. jobId:${jobId} ,JobStatus: ${payload.status}`);
    const url = this.config.get<string>('jobUrl');
    const updateUrl = `${url}/${jobId}`;
    await axios.put(updateUrl, payload);
  }
}
