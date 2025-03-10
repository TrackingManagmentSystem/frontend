import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";
import type { State } from "../types";

export default (): State<Shipment> => ({
  loading: false,
  list: [],
  actual: null,
})
