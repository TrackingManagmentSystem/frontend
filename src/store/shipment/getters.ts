import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";
import type { State } from "@/store/types";

export default {
  getTranslatedStatus: (state: State<Shipment>) => {
    return state?.list
  },
}
