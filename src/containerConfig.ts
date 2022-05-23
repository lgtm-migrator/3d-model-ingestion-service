import { readFileSync } from 'fs';
import config from 'config';
import { logMethod } from '@map-colonies/telemetry';
import { DependencyContainer } from 'tsyringe/dist/typings/types';
import jsLogger, { LoggerOptions } from '@map-colonies/js-logger';
import {  Metrics } from '@map-colonies/telemetry';
import { trace } from '@opentelemetry/api';
import { SERVICES, SERVICE_NAME } from './common/constants';
import { InjectionObject, registerDependencies } from './common/dependencyRegistration';
import { tracing } from './common/tracing';

export interface RegisterOptions {
  override?: InjectionObject<unknown>[];
  useChild?: boolean;
}

export const registerExternalValues = (options?: RegisterOptions): DependencyContainer => {
  const loggerConfig = config.get<LoggerOptions>('logger');
  const packageContent = readFileSync('./package.json', 'utf8');
  //const service = JSON.parse(packageContent) as IServiceConfig;
  //const logger = new MCLogger(loggerConfig, service);
  const logger = jsLogger({ ...loggerConfig, prettyPrint: loggerConfig.prettyPrint });

  const metrics = new Metrics(SERVICE_NAME);
  const meter = metrics.start();

  tracing.start();
  const tracer = trace.getTracer(SERVICE_NAME);

  const dependencies: InjectionObject<unknown>[] = [
    { token: SERVICES.CONFIG, provider: { useValue: config } },
    { token: SERVICES.LOGGER, provider: { useValue: logger } },
    { token: SERVICES.TRACER, provider: { useValue: tracer } },
    { token: SERVICES.METER, provider: { useValue: meter } },
    {
      token: 'onSignal',
      provider: {
        useValue: {
          useValue: async (): Promise<void> => {
            await Promise.all([tracing.stop(), metrics.stop()]);
          },
        },
      },
    },
  ];

  return registerDependencies(dependencies, options?.override, options?.useChild);
};

