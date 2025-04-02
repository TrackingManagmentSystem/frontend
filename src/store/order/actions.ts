import OrderRepository from "@/repositories/Order/OrderRepository";
import type { ActionsType, StateType } from "./types";

export async function loadList(this: StateType) {
  this.loading = true
  try {
    await OrderRepository.fetchAll({
      include: 'buyer,seller,items,shipment'
    }).then(({ data }) => {
      this.list = data.map(order => ({
        ...order,
        context: JSON.parse(order.context as string),
      }));
    })
  } catch (error) {
    console.log('error :>> ', error);
  } finally {
    this.loading = false
  }
}

export async function sync(this: StateType) {
  this.loading = true
  try {
    await OrderRepository.sync().then(({ data }) => {
      console.log('data :>> ', data);
    })
  } catch (error) {
    console.log('error :>> ', error);
  } finally {
    this.loading = false
  }
}

export default {
  loadList,
  sync
} as unknown as ActionsType
