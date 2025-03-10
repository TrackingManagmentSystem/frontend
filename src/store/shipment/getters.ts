import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";
import type { State } from "@/store/types";

export default {
  getList: (state: State<Shipment>) => {
    return state?.list
  },
}
