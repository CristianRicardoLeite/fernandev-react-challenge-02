export function login(password, email) {
  const delay = (0.7 + Math.random() * 2) * 1000;


  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (password === 'password123' && !!email) {
        resolve({ message: 'Sucessfull.' });
      } else {
        reject({ message: 'e-mail or password wrong.' });
      }
    }, delay);
  });
}
