export default function validate({
  firstName,
  lastName,
  email,
  password,
  avatar,
}) {
  if (!firstName.trim()) {
    return "Enter the First Name";
  }
  if (!lastName) {
    return "Enter the Last Name";
  }
  if (!email) {
    return "Enter the Email";
  }
  if (!password) {
    return "Enter the password";
  }
  if (!avatar) {
    return "Enter the avatar link";
  }
  return null;
}
