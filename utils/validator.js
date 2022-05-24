module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() == "") {
    errors.username = "User Name Not Be Empty";
  }
  if (email == "") {
    errors.email = "Email Not Be Empty";
  } else {
    const regEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(regEx)) {
      errors.email = "Email Not Valid";
    }
  }
  if (password === "") {
    errors.password = "Password Not Be Empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password Not Match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateloginInput=(username,password)=>{
    const errors={}

    if (username.trim() == "") {
        errors.username = "User Name Not Be Empty";
      }
      if (password === "") {
        errors.password = "Password Not Be Empty";
      }
      return {
        errors,
        valid: Object.keys(errors).length < 1,
      };
}
