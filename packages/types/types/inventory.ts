import { z } from 'zod'

export const zInventoryItemSchema = z.object({
  id: z.string().uuid(),
  metalType: z.enum(['gold', 'silver', 'copper']),
  weight: z.number(),
  unit: z.enum(['g']),
  itemName: z.string(),
  purity: z.number().min(0).max(100),
  lastModified: z.date().default(() => new Date())
})

export type InventoryItem = z.infer<typeof zInventoryItemSchema>
