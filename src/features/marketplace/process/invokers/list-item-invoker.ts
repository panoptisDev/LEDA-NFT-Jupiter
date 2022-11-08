import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class ListItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onListItemCommand: ICommand<MarketplaceState>,
    private onStoreDelistItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onListItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreDelistItemCommand.execute(this.state);

    return this.state;
  }
}
