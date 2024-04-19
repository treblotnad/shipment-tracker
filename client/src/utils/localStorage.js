export const getSavedShipmentIds = () => {
  const savedShipmentIds = localStorage.getItem('saved_shipments')
    ? JSON.parse(localStorage.getItem('saved_shipments'))
    : [];

  return savedShipmentIds;
};

export const saveShipmentIds = (shipmentIdArr) => {
  if (shipmentIdArr.length) {
    localStorage.setItem('saved_shipments', JSON.stringify(shipmentIdArr));
  } else {
    localStorage.removeItem('saved_shipments');
  }
};

export const removeShipmentId = (shipmentId) => {
  const savedShipmentIds = localStorage.getItem('saved_shipments')
    ? JSON.parse(localStorage.getItem('saved_shipments'))
    : null;

  if (!savedShipmentIds) {
    return false;
  }

  const updatedSavedShipmentIds = savedShipmentIds?.filter((savedShipmentId) => savedShipmentId !== shipmentId);
  localStorage.setItem('saved_shipments', JSON.stringify(updatedSavedShipmentIds));

  return true;
};
