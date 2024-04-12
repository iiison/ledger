import { Request } from 'express';
import { InventoryItem } from 'types';

export type PartialInventoryItem = Omit<Partial<InventoryItem>, 'id'> & {
  id?: InventoryItem['id'] | undefined; // NOT right, id should not be optional
}

export interface CustomUpdateReq extends Request {
  parsedBody?: PartialInventoryItem | undefined;
}
