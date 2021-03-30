import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import { FlowPayload } from '../../common/models/flowPayload';

@injectable()
export class FlowsManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async createFlow(payload: FlowPayload): Promise<Flow> {
    this.logger.log('info', `Create a new flow: ${JSON.stringify(payload)}`);
    const url = this.config.get<string>('flowUrl');
    const response = await axios.post<Flow>(url, payload);
    return response.data;
  }
}
