import { z } from "zod"

import { getInventory } from "./inventoryModel"
import { 
  ServiceResponse,
  buildSuccessServiceResponse,
  buildNotFoundServiceResponse,
  buildInternalErrorServiceResponse,
} from "../../common/models/serviceResponse"

import { zInventoryItemSchema, type InventoryItem } from "types"

export const inventoryService = {
  findAll: async (): Promise<ServiceResponse<InventoryItem[] | null>> => {
    try {
      const inventoryData = await getInventory()

      if (!inventoryData) {
        return buildNotFoundServiceResponse('No Inventory Found')
      }

      const parsedData = z.array(zInventoryItemSchema).parse(inventoryData)
      console.log(parsedData)

      return buildSuccessServiceResponse('Found Inventory', inventoryData)
    } catch(error) {
      // TODO: Log internal Server error
      const errorMsg = `Error finding inventory: $${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  }
}
