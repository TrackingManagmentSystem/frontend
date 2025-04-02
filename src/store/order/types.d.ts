import type { Order } from "@/repositories/Order/OrderRepository";
import type { State } from "../types";

export type StateType = State<Order> & {

};

export type GettersType = {
  getList(state: StateType): StateType['list'];
};

export type ActionsType = {
  loadList: (...args: any[]) => Promise<Order[]>;
  sync: (...args: any[]) => Promise<Order[]>;
};
