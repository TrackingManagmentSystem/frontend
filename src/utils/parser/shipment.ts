import type { Shipment } from '@/repositories/Shipment/ShipmentRepository'
import { parseDateTimeString, parseMoney } from '../parser'

const statusTranslations = {
  to_be_agreed: 'A ser acordado',
  pending: 'Pendente',
  cost_exceeded: 'Custo excedido',
  under_review: 'Em revisão (ex.: fraude)',
  reviewed: 'Revisado',
  fraudulent: 'Fraudulento',
  waiting_for_payment: 'Aguardando pagamento do frete ser creditado',
  shipment_paid: 'Custo do frete pago',
  creating_route: 'Rota criada',
  manufacturing: 'Em fabricação',
  buffered: 'Em buffer',
  creating_shipping_order: 'Criando ordem de envio',
  handling: 'Em processamento',
  regenerating: 'Regenerando',
  waiting_for_label_generation: 'Aguardando geração de etiqueta',
  invoice_pending: 'Fatura pendente',
  waiting_for_return_confirmation: 'Aguardando confirmação de devolução',
  return_confirmed: 'Devolução confirmada',
  agency_unavailable: 'Agência indisponível',
  ready_to_ship: 'Pronto para envio',
  ready_to_print: 'Pronto para impressão',
  printed: 'Impresso',
  in_pickup_list: 'Na lista de coleta',
  ready_for_pkl_creation: 'Pronto para criação de PKL',
  ready_for_pickup: 'Pronto para retirada',
  ready_for_dropoff: 'Pronto para entrega no ponto de coleta',
  picked_up: 'Coletado',
  stale: 'Pronto para envio expirado',
  dropped_off: 'Entregue no Melipoint',
  delayed: 'Atrasado',
  claimed_me: 'Envio expirado reivindicado pelo comprador',
  waiting_for_last_mile_authorization: 'Aguardando autorização da última milha',
  rejected_in_hub: 'Rejeitado no hub',
  in_transit: 'Em trânsito',
  in_warehouse: 'No armazém',
  ready_to_pack: 'Pronto para embalar',
  in_hub: 'No hub',
  measures_ready: 'Medidas e peso prontos',
  waiting_for_carrier_authorization: 'Aguardando autorização da transportadora',
  authorized_by_carrier: 'Autorizado pela transportadora MELI',
  in_packing_list: 'Na lista de embalagem',
  in_plp: 'No PLP',
  on_hold: 'Em espera',
  packed: 'Embalado',
  on_route_to_pickup: 'A caminho para coleta',
  picking_up: 'Coletando',
  shipping_order_initialized: 'Ordem de envio iniciada',
  looking_for_driver: 'Procurando motorista',
  shipped: 'Enviado',
  waiting_for_withdrawal: 'Aguardando retirada',
  contact_with_carrier_required: 'Contato com a transportadora necessário',
  receiver_absent: 'Destinatário ausente',
  reclaimed: 'Reivindicado',
  not_localized: 'Não localizado',
  forwarded_to_third: 'Encaminhado a terceiros',
  soon_deliver: 'Entrega em breve',
  refused_delivery: 'Entrega recusada',
  bad_address: 'Endereço incorreto',
  changed_address: 'Endereço alterado',
  negative_feedback: 'Envio expirado com feedback negativo do comprador',
  need_review: 'Necessário revisar status da transportadora',
  operator_intervention: 'Necessário intervenção de operador',
  retained: 'Retido',
  out_for_delivery: 'Pacote a caminho da entrega',
  delivery_failed: 'Entrega falhou',
  waiting_for_confirmation: 'Aguardando confirmação',
  at_the_door: 'Entrega na porta do comprador',
  buyer_edt_limit_stale: 'Limite de tempo de entrega expirado pelo comprador',
  delivery_blocked: 'Entrega bloqueada',
  awaiting_tax_documentation: 'Aguardando documentação fiscal',
  dangerous_area: 'Área perigosa',
  buyer_rescheduled: 'Comprador reagendou',
  failover: 'Falha no sistema',
  at_customs: 'Na alfândega',
  delayed_at_customs: 'Atrasado na alfândega',
  left_customs: 'Liberado pela alfândega',
  missing_sender_payment: 'Pagamento do remetente pendente',
  missing_sender_documentation: 'Documentação do remetente pendente',
  missing_recipient_documentation: 'Documentação do destinatário pendente',
  missing_recipient_payment: 'Pagamento do destinatário pendente',
  import_taxes_paid: 'Impostos de importação pagos',
  delivered: 'Entregue',
  damaged: 'Danificado',
  fulfilled_feedback: 'Entrega confirmada pelo comprador',
  no_action_taken: 'Nenhuma ação tomada pelo comprador',
  double_refund: 'Reembolso duplo',
  inferred: 'Entrega inferida',
  not_delivered: 'Não entregue',
  returning_to_sender: 'Retornando ao remetente',
  to_review: 'Envio fechado',
  destroyed: 'Destruído',
  cancelled_measurement_exceeded: 'Envio cancelado por medidas excedidas',
  returned_to_hub: 'Retornado ao hub',
  returned_to_agency: 'Retornado à agência',
  picked_up_for_return: 'Coletado para devolução',
  returning_to_warehouse: 'Retornando ao armazém',
  returning_to_hub: 'Retornando ao hub',
  soon_to_be_returned: 'Em breve será devolvido',
  return_failed: 'Devolução falhou',
  in_storage: 'Em armazenamento',
  pending_recovery: 'Recuperação pendente',
  rejected_damaged: 'Rejeitado por dano',
  refunded_by_delay: 'Reembolsado por atraso',
  shipment_stopped: 'Envio interrompido',
  stolen: 'Roubado',
  returned: 'Devolvido',
  confiscated: 'Confiscado',
  lost: 'Pacote perdido',
  recovered: 'Recuperado',
  returned_to_warehouse: 'Retornado ao armazém',
  not_recovered: 'Não recuperado',
  detained_at_customs: 'Retido na alfândega',
  detained_at_origin: 'Retido na origem',
  unclaimed: 'Não reclamado pelo vendedor',
  import_tax_rejected: 'Imposto de importação rejeitado',
  import_tax_expired: 'Imposto de importação expirado',
  rider_not_found: 'Entregador não encontrado',
  not_verified: 'Não verificado',
  cancelled: 'Cancelado',
  label_expired: 'Etiqueta expirada',
  cancelled_manually: 'Cancelado manualmente',
  return_expired: 'Devolução expirada',
  return_session_expired: 'Sessão de devolução expirada',
  unfulfillable: 'Não realizável',
  closed_by_user: 'Usuário alterou o tipo de envio e cancelou o anterior',
  pack_splitted: 'Pacote foi dividido, então o envio foi cancelado',
  shipped_outside_me: 'Enviado fora do MELI',
  shipped_outside_me_trusted: 'Enviado fora do MELI por vendedor confiável',
  inferred_shipped: 'Envio inferido',
  paid: 'Pago',
  test_order: 'Ordem de Teste',
}

type StatusType = keyof typeof statusTranslations

export const getStatusLabel = (status: string) => {
  return statusTranslations[status as StatusType] || `Desconhecido: ${status}`
}

const translateStatusHistoryLabel = (type: string): string => {
  const statusHistoryType = {
    dateCancelled: `Dt Cancelamento`,
    dateDelivered: `Dt Entrega`,
    dateFirstVisit: `Dt 1ª Visita`,
    dateHandling: `Dt Coleta`,
    dateNotDelivered: `Dt não entrega`,
    dateReadyToShip: `Dt Pronto pra entrega`,
    dateReturned: `Dt Retorno`,
    dateShipped: `Dt Entregue`,
  }

  return statusHistoryType[type] as string
}

export const parseStatusHistory = (history: Shipment['statusHistory']) => {
  return Object.entries(history)
    .filter(([label, _dateTime]) => label !== `id`)
    .map(([label, dateTime]) => ({
      date: dateTime ? parseDateTimeString(dateTime).date : null,
      time: dateTime ? parseDateTimeString(dateTime).time : null,
      label: translateStatusHistoryLabel(label),
    }))
}

export const addressType = {
  countryName: 'País',
  cityName: 'Cidade',
  stateName: 'Estado',
  streetName: 'Rua',
  streetNumber: 'Número',
  zipCode: 'CEP',
  addressLine: 'Logradouro',
  comment: 'Comentario',
  neighborhoodName: 'Bairro',
}
const translateAddressLabel = (type: string): string => {
  // return type in addressType
  //   ? addressType[type] as string
  //   : type
  return addressType[type] as string
}

export const parseAddress = (history: Shipment['receiverAddress']) => {
  return Object.entries(history)
    .filter(([label, _value]) => label in addressType)
    .map(([label, value]) => ({
      label: translateAddressLabel(label),
      value,
    }))
}

export const translateLogistic = (type: string): string => {
  const logisticType = {
    drop_off: 'Mercado Envios',
    xd_drop_off: 'Mercado Envios Coletas e Places',
    self_service: 'Mercado Envios Flex',
    fulfillment: 'Mercado Envios Full',
  }
  return logisticType[type] as string
}

export type ShipmentListItem =
  Omit<Shipment, 'statusHistory' | 'dateCreated' | 'lastUpdated'>
  & {
    seller: string;
    receiver: {
      place: string;
      estimatedDelivery: { date: string; time: string; } | string;
    }
    receiverAddress: Shipment['receiverAddress'] & {
      translated: { label: string; value: string; }[];
    }
    senderAddress: Shipment['senderAddress'] & {
      translated: { label: string; value: string; }[];
    }
    statusHistory: {
      date: string | null;
      time: string | null;
      label: string;
    }[]
    dateCreated: { date: string; time: string; };
    lastUpdated: { date: string; time: string; };
    cost: string;
  }

export const parseShipment = (shipment: Shipment): ShipmentListItem => {
  return {
    ...shipment,
    seller: shipment.order.seller.nickname,
    receiver: {
      place: `${shipment.receiverAddress.cityName} ${shipment.receiverAddress.neighborhoodName}`,
      estimatedDelivery: shipment.shippingOption.estimatedDeliveryTime.date
        ? parseDateTimeString(shipment.shippingOption.estimatedDeliveryTime.date)
        : '',
    },
    status: getStatusLabel(shipment.status),

    receiverAddress: {
      ...shipment.receiverAddress,
      translated: parseAddress(shipment.receiverAddress)
    },
    senderAddress: {
      ...shipment.senderAddress,
      translated: parseAddress(shipment.senderAddress)
    },
    statusHistory: parseStatusHistory(shipment.statusHistory),
    dateCreated: parseDateTimeString(shipment.dateCreated),
    lastUpdated: parseDateTimeString(shipment.lastUpdated),
    logisticType: translateLogistic(shipment.logisticType),
    cost: parseMoney(shipment.shippingOption.cost),
  }
}
