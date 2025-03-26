import OrderRepository from "@/repositories/Order/OrderRepository";

export async function loadList() {
  this.loading = true
  try {
    await OrderRepository.fetchAll({
      include: 'buyer,seller,items'
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

export async function sync() {
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
