import { History, Item } from '@types';
import HttpService from '../../../common/services/http.service';
import ItemRequest from '../../../common/types/item-request';
import { FilterType, PriceRangeType } from '../../../types/item-filter-types';
import IItemService from '../interfaces/item-service.interface';

export default class ItemService extends HttpService implements IItemService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await this.instance.get(`${this.endpoint}`);
    return data;
  }

  async findPagedItems(filters: FilterType): Promise<{ items: Item[]; totalCount: number }> {
    const { limit, page, likesDirection, priceRange, search } = filters;
    const { data } = await this.instance.get<{ items: Item[]; totalCount: number }>(
      `${this.endpoint}/paginate?limit=${limit}&page=${page}&likesOrder=${likesDirection}&priceFrom=${priceRange.from}&priceTo=${priceRange.to}&search=${search}`
    );

    return { items: data.items, totalCount: data.totalCount };
  }

  async findById(itemId: string): Promise<Item> {
    const { data } = await this.instance.get<Item>(`${this.endpoint}/${itemId}`);
    return data;
  }

  async findPriceRange(): Promise<PriceRangeType> {
    const { data } = await this.instance.get<PriceRangeType>(`${this.endpoint}/price-range`);
    return data;
  }

  async buy(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/buy`, {
      address,
    });
    return data;
  }

  async list(itemId: string, price: string, listId: number, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/list`, {
      price,
      listId,
      address,
    });
    return data;
  }

  async delist(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.patch<Item>(`${this.endpoint}/${itemId}/delist`, {
      address,
    });
    return data;
  }

  async create(item: ItemRequest): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}`, item);
    return data;
  }

  async findAllHistory(): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/history`);
    return data;
  }

  async findHistoryByItemId(itemId: string): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/${itemId}/history`);
    return data;
  }

  async like(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.patch<Item>(`${this.endpoint}/${itemId}/like`, {
      address,
    });
    return data;
  }
}

export const itemService = new ItemService();
