import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { IConfig } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import { FlowPayload } from '../../common/models/flowPayload';

@injectable()
export class FlowsManager {
  public constructor(@inject(SERVICES.CONFIG) private readonly config: IConfig, @inject(SERVICES.LOGGER) private readonly logger: Logger) {}

  public async createFlow(payload: FlowPayload): Promise<Flow> {
    this.logger.info(`Create a new flow: ${JSON.stringify(payload)}`);
    const url = this.config.get<string>('flowUrl');
    const response = await axios.post<Flow>(url, payload);
    return response.data;
  }
}
