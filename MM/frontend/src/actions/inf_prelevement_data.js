export async function getAllInfirmier(token){

    const response = await fetch(
        '/labo/api/get_all_infirmiers/',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "no data";
    }
  
  };
  
  export async function getSelectedInfirmier(token, id){
  
    const response = await fetch(
      '/labo/api/get_selected_infirmier/'+id,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "no data";
  }
  
  };
  
  
  export async function addNewInfirmier(token, data){
  const response = await fetch(
      '/labo/api/create_new_infirmier/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
        },
        body: data
      }
  );
  const text = await response.text();
  if (response.status === 201) {
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }
  
  };
  
  
  export async function updateInfirmier(token, data, id){
  const response = await fetch(
      '/labo/api/update_infirmier/'+id,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
        },
        body: data
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
  
  
  export async function deleteInfirmier(token, id){
  const response = await fetch(
      '/labo/api/delete_infirmier/'+id,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
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
  
  
  
  export async function getAllInfirmierForSelect(token){
    const response = await fetch(
        '/labo/api/get_all_infirmier_to_select/',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`);
      });
      return "no data";
    }
  
  };