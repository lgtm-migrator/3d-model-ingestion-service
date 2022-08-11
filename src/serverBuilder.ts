import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { OpenapiViewerRouter, OpenapiRouterConfig } from '@map-colonies/openapi-express-viewer';
import { getErrorHandlerMiddleware } from '@map-colonies/error-express-handler';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import { container, inject, injectable } from 'tsyringe';
import getStorageExplorerMiddleware from '@map-colonies/storage-explorer-middleware';
import { Logger } from '@map-colonies/js-logger';
import httpLogger from '@map-colonies/express-access-log-middleware';
import { SERVICES } from './common/constants';
import { IConfig } from './common/interfaces';
import { modelsRouterFactory } from './model/routes/modelsRouter';
import { mountDirs } from './common/models/mountDirs';

@injectable()
export class ServerBuilder {
  private readonly serverInstance: express.Application;

  public constructor(@inject(SERVICES.CONFIG) private readonly config: IConfig, @inject(SERVICES.LOGGER) private readonly logger: Logger) {
    this.serverInstance = express();
  }

  public build(): express.Application {
    this.registerPreRoutesMiddleware();
    this.buildRoutes();
    this.registerPostRoutesMiddleware();

    return this.serverInstance;
  }

  private buildDocsRoutes(): void {
    const openapiRouter = new OpenapiViewerRouter(this.config.get<OpenapiRouterConfig>('openapiConfig'));
    openapiRouter.setup();
    this.serverInstance.use(this.config.get<string>('openapiConfig.basePath'), openapiRouter.getRouter());
  }

  private buildRoutes(): void {
    this.serverInstance.use('/models', modelsRouterFactory(container));
    this.serverInstance.use(getStorageExplorerMiddleware(mountDirs, this.logger as unknown as Record<string, unknown>));
    this.buildDocsRoutes();
  }

  private registerPreRoutesMiddleware(): void {
    this.serverInstance.use(httpLogger({ logger: this.logger }));
    this.serverInstance.use(cors());
    this.serverInstance.use(bodyParser.json());

    const ignorePathRegex = new RegExp(`^(${this.config.get<string>('openapiConfig.basePath')})|(explorer)/.*`, 'i');
    const apiSpecPath = this.config.get<string>('openapiConfig.filePath');
    this.serverInstance.use(OpenApiMiddleware({ apiSpec: apiSpecPath, validateRequests: true, ignorePaths: ignorePathRegex }));
  }

  private registerPostRoutesMiddleware(): void {
    this.serverInstance.options('*', cors);
    this.serverInstance.use(getErrorHandlerMiddleware());
  }
}
