import type { Order } from "@/repositories/Order/OrderRepository";
import type { State } from "../types";

export default (): State<Order> => ({
  loading: false,
  list: [],
  actual: null,
})
