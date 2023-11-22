import axios from "axios";

export async function createUser(userData) {
  return axios.post("http://localhost:8080/users", userData);
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    let res = await fetch(`http://localhost:8080/users?email=${email}`);
    let data = await res.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject("wrong credentials");
      }
    } else {
      reject("user not found");
    }
  });
}




// export async function checkUser(loginInfo) {
//   const email = loginInfo.email;
//   const password = loginInfo.password;
//   let res = axios.post(
//     `http://localhost:8080/users?email=${email}`
//   );
//   console.log(res);
//   if (res.length) {
//     if (password === res.data[0].password) {
//       return res;
//     } else {
//       return "wrong credentials";
//     }
//   } else {
//     return "user not found";
//   }
// }
