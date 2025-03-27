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

export async function sync(shipmentId: string) {
  this.loading = true
  try {
    await ShipmentRepository.sync(shipmentId)
      .then(({ data }) => {
        if (this.list.length > 0) {
          this.list = this.list.map(shipment => {
            if (shipment.id.toString() === shipmentId) {
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
