const StrongPassword = (props) => {
  const { password } = props;
  const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
  if (strongPassword.test(password)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { StrongPassword };
