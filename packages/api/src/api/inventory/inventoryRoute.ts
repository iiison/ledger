// import { z } from 'zod';
import { v4 as uuidV4 } from 'uuid'
import express, { Request, Response, Router } from 'express';
// import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { InventoryItem, zInventoryItemSchema } from 'types'
// import { createApiResponse } from '../../api-docs/openAPIResponseBuilder'
import { handleServiceResponse, validateRequestData } from '../../common/utils/httpHandlers'
import { inventoryService } from './inventoryService';
import { validateUpdateInventoryReq } from './validators';
import { buildBadReqServiceResponse, buildInternalErrorServiceResponse } from '../../common/models/serviceResponse';
import { CustomUpdateReq, PartialInventoryItem } from './types';

// export const inventoryRegistry = new OpenAPIRegistry()

// inventoryRegistry.register('Inventory', zInventoryItemSchema)

export const inventoryRouter: Router = (() => {
  const router = express.Router()

  // type UpdateReqData = z.object({
  //   id: z.string().uuid()
  // })
  

  // inventoryRegistry.registerPath({
  //   method: 'get',
  //   path: '/inventory',
  //   tags: ['Inventory'],
  //   responses: createApiResponse(z.unknown(), 'test')
  // })

  router.get('/find-all', async (_req: Request, res: Response) => {
    const inventory = await inventoryService.findAll()

    handleServiceResponse(inventory, res)
  })

  router.get('/:id', async (req: Request, res: Response) => {
    const { params: { id } } = req
    const inventory = await inventoryService.findById(id)

    handleServiceResponse(inventory, res)
  })

  router.post(
    '/update',
    validateUpdateInventoryReq,
    async (req: CustomUpdateReq, res: Response) => {
      const { parsedBody: body } = req

      if (!body) {
        handleServiceResponse(
          buildInternalErrorServiceResponse('Something is not right'),
          res
        )
        return
      }

      const { id, ...update }: PartialInventoryItem = body

      // Must be a better way to define type
      // there should not be check for id here & above this for body.
      if (!id) {
        return
      }

      const updatedItem = await inventoryService.updateById(id, update)

      console.log(updatedItem)

      handleServiceResponse(buildBadReqServiceResponse('False!'), res)
    }
  )

  return router
})()
