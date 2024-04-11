import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import zodSchema from '@zodyac/zod-mongoose'
import { model } from 'mongoose'
import { z } from 'zod'

import { InventoryItem, zInventoryItemSchema } from 'types'

extendZodWithOpenApi(z)

export const inventorySchema = zodSchema(zInventoryItemSchema)

export const Inventory = model<InventoryItem>('inventory', inventorySchema)

export const getInventory = async (): Promise<InventoryItem[] | null> => {
  const result = await Inventory.find()

  return result
}
