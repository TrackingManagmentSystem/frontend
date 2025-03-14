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

export async function syncShipment(shipmentId: string) {
  this.loading = true
  try {
    await ShipmentRepository.syncData(shipmentId)
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
