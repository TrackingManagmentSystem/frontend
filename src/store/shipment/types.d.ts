import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";
import type { State } from "../types";

export type StateType = State<Shipment> & {

};

export type GettersType = {
  getList(state: StateType): StateType['list'];
};

export type ActionsType = {
  loadList: (...args: any[]) => Promise<Shipment[]>;
  sync: (...args: any[]) => Promise<Shipment[]>;
};
