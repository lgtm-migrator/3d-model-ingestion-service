import { Router } from 'express';
import { FactoryFunction } from 'tsyringe';
import { ModelsController } from '../controllers/modelsController';

const modelsRouterFactory: FactoryFunction<Router> = (dependencyContainer) => {
  const router = Router();
  const controller = dependencyContainer.resolve(ModelsController);

  router.post('/', controller.createModel);

  return router;
};

export { modelsRouterFactory };
