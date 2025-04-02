import ShipmentRepository from "@/repositories/Shipment/ShipmentRepository";
import type { ActionsType, StateType } from "./types";

export async function loadList(this: StateType) {
  this.loading = true
  try {
    await ShipmentRepository.fetchAll()
      .then(({ data }) => {
        this.list = data;
      })
  } catch (error) {
    console.log('error :>> ', error);
  }
  this.loading = false
}

export async function sync(this: StateType, shipmentId: string) {
  this.loading = true
  try {
    await ShipmentRepository.sync(shipmentId)
      .then(({ data }) => {
        if (this.list.length > 0) {
          this.list = this.list.map(shipment => {
            if (shipment.id === shipmentId) {
              return data;
            }
            return shipment;
          })
        }
      })
  } catch (error) {
    console.log('error :>> ', error);
  }
  this.loading = false
}

export default {
  loadList,
  sync
} as unknown as ActionsType
