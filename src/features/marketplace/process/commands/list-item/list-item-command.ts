import { ethers } from 'ethers';
import { IMarketplaceService } from '../../../services/marketplace-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class MakeItemNftCommand implements ICommand<MarketplaceState> {
  private readonly marketplaceService: IMarketplaceService;

  constructor(_marketplaceService: IMarketplaceService) {
    this.marketplaceService = _marketplaceService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.tokenId) return { ...state, error: MarketplaceError.RequiredTokenId };
    if (!state.collectionAddress)
      return { ...state, error: MarketplaceError.RequiredCollectionAddress };

    try {
      await this.marketplaceService.init();

      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();
      const transaction = await this.marketplaceService.listItem(
        state.collectionAddress,
        state.tokenId,
        wei
      );
      if (!transaction) return { ...state, error: MarketplaceError.ListItemUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MarketplaceError.ContractReceiptFailure };

      const listedItemEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!listedItemEvent) return { ...state, error: MarketplaceError.ContractEventNotFound };

      state.mintEvent = listedItemEvent;
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|MakeItemNftCommand', ex);
      return { ...state, error: MarketplaceError.ListItemFailure };
    }

    return state;
  }
}
