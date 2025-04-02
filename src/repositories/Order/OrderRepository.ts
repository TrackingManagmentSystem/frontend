import { Repository } from '@/repositories/Base/Repository'

interface OrderRequest {
  change: string | null;
  return: string | null;
}

interface Shipping {
  id: number;
}

interface BuyerSeller {
  id: number;
  nickname: string;
}

interface Context {
  application: string | null;
  productId: string | null;
  channel: string;
  site: string;
  flows: string[];
}

export type Order = {
  fulfilled: string | null;
  orderRequest: OrderRequest;
  expirationDate: string | null;
  shippingId: string;
  shipping: Shipping;
  dateClosed: string;
  id: number;
  items: Record<string, unknown>[];
  dateLastUpdated: string;
  lastUpdated: string;
  comment: string | null;
  packId: string | null;
  shippingCost: number | null;
  dateCreated: string;
  pickupId: string | null;
  statusDetail: string | null;
  tags: string[];
  buyer: BuyerSeller;
  seller: BuyerSeller;
  totalAmount: number;
  paidAmount: number;
  currencyId: string;
  status: string;
  context: Context | string;
};


class OrderRepository extends Repository<Order> {
  endpoint = 'order'

  sync() {
    return this.$axios.useBearerToken().post(`${this.endpoint}s/sync`)
  }
}

export default new OrderRepository()
