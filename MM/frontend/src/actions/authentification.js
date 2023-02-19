import { useNavigate } from "react-router-dom";



// CHECK TOKEN & LOAD USER
export const loadUser = () => async (token) => {
  
  const response = await fetch(
      '/accounts/auth/users/me/',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`,
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    console.log("User loaded");
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};



export const login_api = async (username, password) => {
  const response = await fetch(
        `/accounts/auth/token/login/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "user_name": username,
              "password": password,
            })
        }
    );
  const text = await response.text();
  if (response.status === 200) {
    console.log(JSON.parse(text));
    await localStorage.setItem("auth_token", JSON.parse(text).auth_token);
    return "logged";
  } else {
    console.log(text);
    return "error";

  }
};



// REGISTER USER
export const register = async (user,password,type,token) => {
  const response = await fetch(
      '/accounts/auth/users/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
              "user_name": user,
              "password": password,
              "type": type,
            })
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    console.log("User: "+user+" created");
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};




// LOGOUT USER
export const logout =  async (token) => {
  const response = await fetch(
      '/accounts/auth/token/logout/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    console.log("User" + email + " created");
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};


export const getAllUsersForLogin = async() => {
  
  const response = await fetch(
      '/accounts/api/get_all_users_for_login/',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }
};