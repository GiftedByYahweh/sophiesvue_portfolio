import { FastifyPluginCallback } from 'fastify';
import { PortfolioService } from './portfolioService';

interface PortfolioRoutesOptions {
  portfolioService: PortfolioService;
}

export const portfolioRoutes: FastifyPluginCallback<PortfolioRoutesOptions> = (
  app,
  { portfolioService },
) => {
  app.get('/snapshot', async () => {
    try {
      const data = await portfolioService.getSnapshot();
      return { data };
    } catch (err) {
      console.log(err);
    }
  });
};
