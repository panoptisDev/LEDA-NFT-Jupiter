import { ItemProperty } from './ipfs-types';

type DraftItemRequest = {
  itemId: string;
  address: string;
  collectionAddress: string;
  description: string;
  name: string;
  tags: string[];
  itemProperties: ItemProperty[];
  royalty: number;
};

export default DraftItemRequest;
