import zodSchema from '@zodyac/zod-mongoose'
import { model } from 'mongoose'
import { InventoryItem, zInventoryItemSchema } from 'types'

// zInventoryItemSchema.parse

const inventorySchema = zodSchema(zInventoryItemSchema)

export const Inventory = model<InventoryItem>('inventory', inventorySchema)
