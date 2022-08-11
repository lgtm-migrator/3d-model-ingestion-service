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
    payload.version = '1';
    payload.type = '3D';
    payload.description = '3D Model Ingestion';
    payload.percentage = 0;
    payload.tasks = [];
    this.logger.debug({ msg: 'Create a new job', jobPayload: payload });
    const url = this.config.get<string>('jobUrl');
    try {
      const response = await axios.post<Job>(url, payload);
      return response.data;
    } catch (error) {
      this.logger.error({ msg: 'Creating a new job failed with error messege', error });
      throw error;
    }
  }

  public async updateJobStatus(jobId: string, payload: JobUpdatePayload): Promise<void> {
    this.logger.debug({ msg: 'Updating job status', jobId: jobId, jobStatus: payload.status });
    const url = this.config.get<string>('jobUrl');
    const updateUrl = `${url}/${jobId}`;
    try {
      await axios.put(updateUrl, payload);
      this.logger.info({ msg: 'Success in updating job status', jobId: jobId, jobStatus: payload.status });
    } catch (error) {
      this.logger.error({ msg: 'Failed in updating job status', jobId: jobId, jobStatus: payload.status });
    }
  }
}
