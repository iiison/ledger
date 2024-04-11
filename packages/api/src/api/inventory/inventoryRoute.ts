import { z } from 'zod';
import express, { Request, Response, Router } from 'express';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { zInventoryItemSchema } from 'types'
import { createApiResponse } from '../../api-docs/openAPIResponseBuilder'
import { handleServiceResponse, validateRequestData } from '../../common/utils/httpHandlers'
import { inventoryService } from './inventoryService';

// export const inventoryRegistry = new OpenAPIRegistry()

// inventoryRegistry.register('Inventory', zInventoryItemSchema)

export const inventoryRouter: Router = (() => {
  const router = express.Router()

  type UpdateReqData = z.object({
    id: z.string().uuid()
  })
  

  // inventoryRegistry.registerPath({
  //   method: 'get',
  //   path: '/inventory',
  //   tags: ['Inventory'],
  //   responses: createApiResponse(z.unknown(), 'test')
  // })

  router.get('/', async (_req: Request, res: Response) => {
    const inventory = await inventoryService.findAll()

    handleServiceResponse(inventory, res)
  })

  router.post(
    '/update',
    validateRequestData(),
    async (_req: Request, res: Response) => {
    }
  )

  return router
})()
