function email(message) {
  return { type: 'email', message };
}

function required(message) {
  return { required: true, message };
}

const confirmPassword = ({ getFieldValue }, field) => ({
  validator(_, value) {
    if (!value || getFieldValue(field) === value) {
      return Promise.resolve();
    }
    return Promise.reject(Error('As senhas digitadas não são iguais!'));
  },
});

export { email, required, confirmPassword };
