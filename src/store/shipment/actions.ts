import ShipmentRepository from "@/repositories/Shipment/ShipmentRepository";

export async function loadList() {
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
