import { Repository } from '@/repositories/Base/Repository'

interface EstimatedDeliveryTime {
  date: string;
  payBefore: string;
  schedule: string | null;
  unit: string;
  shipping: number;
  handling: number;
  type: string;
  offsetDate: string | null;
  offsetShipping: number | null;
  timeFrameFrom: string | null;
  timeFrameTo: string | null;
}

interface ShippingOption {
  id: number;
  cost: number;
  listCost: number;
  shippingMethodId: number;
  name: string;
  currencyId: string;
  deliveryPromise: string;
  deliveryType: string;
  processingTime: string | null;
  estimatedScheduleLimit: string | null;
  estimatedDeliveryFinal: string | null;
  bufferingDate: string | null;
  estimatedDeliveryLimit: string | null;
  estimatedHandlingLimit: string | null;
  estimatedDeliveryExtended: string | null;
  estimatedDeliveryTime: EstimatedDeliveryTime;
  pickup_promise: { from: string | null; to: string | null; id: number; };
  priority_class: { id: number, classId: string; };
}

interface CostComponents {
  loyalDiscount: number;
  specialDiscount: number;
  compensation: number;
  gapDiscount: number;
  ratio: number;
}

interface Neighborhood {

}

interface Address {
  id: number;
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  stateId: string;
  stateName: string;
  streetName: string;
  streetNumber: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  deliveryPreference: string;
  addressLine: string;
  comment: string;
  receiverName: string;
  receiverPhone: string;
  neighborhoodName: string;
}

interface SnapshotPacking {
  snapshotId: string;
  packHash: string;
}

interface StatusHistory {
  dateShipped: string | null;
  dateReturned: string | null;
  dateDelivered: string | null;
  dateFirstVisit: string | null;
  dateNotDelivered: string | null;
  dateCancelled: string | null;
  dateHandling: string;
  dateReadyToShip: string;
}

interface PriorityClass {
  id: string;
}

interface ShippingItem {
  id: string;
  description: string;
  quantity: number;
  userProductId: string;
  senderId: number;
  dimensions: string;
  shipmentId: string;
}

export type Shipment = {
  id: number;
  trackingNumber: string;
  status: string;
  subStatus: string;
  type: string;
  mode: string;
  logisticType: string;
  marketPlace: string;
  siteId: string;
  createdBy: string;
  applicationId: string | null;
  orderId: number;
  receiverId: number;
  senderId: number;
  customerId: number | undefined;
  baseCost: number;
  orderCost: number;
  serviceId: number;
  trackingMethod: string;
  lastUpdated: string;
  comments: string | null;
  dateCreated: string;
  dateFirstPrinted: string;
  returnTrackingNumber: string | null;
  returnDetails: string | null;
  quotation: string | null;
  carrierInfo: string | null;
  tags: string[];
  subStatusHistory: string[];
  shippingOption: ShippingOption;
  costComponents: CostComponents;
  senderAddress: Address;
  receiverAddress: Address;
  sibling: {
    siblingId: string | null;
    reason: string | null;
    description: string | null;
    source: string | null;
    dateCreated: string | null;
    lastUpdated: string | null;
  };
  snapshotPacking: SnapshotPacking;
  statusHistory: StatusHistory;
  shippingItems: ShippingItem[];
}

class ShipmentRepository extends Repository<Shipment> {
  endpoint = 'shipment'

  syncData (shipmentId: string) {
    return this.$axios
      .useBearerToken()
      .get<Shipment>(`${this.endpoint}/${shipmentId}/sync`)
  }
}

export default new ShipmentRepository()
