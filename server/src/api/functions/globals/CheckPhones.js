const CheckPhones = (props) => {
  const { providedPhone, databasePhones } = props;

  let databasePhonesArray = [];

  databasePhones.forEach((phone) => {
    phone.phones.forEach((phone) => {
      databasePhonesArray.push(phone);
    });
  });

  return providedPhone.every((phone) => {
    if (databasePhonesArray.includes(phone)) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = { CheckPhones };
