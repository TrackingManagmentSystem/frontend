import type { Order } from "@/repositories/Order/OrderRepository";
import type { State } from "@/store/types";

export default {
  getList: (state: State<Order>) => {
    return state?.list
  },
}
