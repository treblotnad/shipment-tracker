export const matchCarrier = (tracking) => {
  const upsReg =
    /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/;

  const uspsReg1 = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/;
  const uspsReg2 = /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/;
  const uspsReg3 = /^91[0-9]+$/;
  const uspsReg4 = /^[A-Za-z]{2}[0-9]+US$/;

  const fedexReg1 = /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/;
  const fedexReg2 =
    /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/;
  const fedexReg3 = /^[0-9]{15}$/;

  if (tracking.match(upsReg)) {
    return "ups";
  }
  if (
    tracking.match(uspsReg1) ||
    tracking.match(uspsReg2) ||
    tracking.match(uspsReg3) ||
    tracking.match(uspsReg4)
  ) {
    return "usps";
  }
  if (
    tracking.match(fedexReg1) ||
    tracking.match(fedexReg2) ||
    tracking.match(fedexReg3)
  ) {
    return "fedex";
  }
};


