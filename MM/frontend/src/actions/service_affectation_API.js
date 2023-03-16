export async function getAllServiceAffectation(token){

    const response = await fetch(
        '/DMM/api/get_all_service_affectation/',
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
  
  export async function getSelectedServiceAffectation(token, id){
  
    const response = await fetch(
      '/DMM/api/get_selected_service_affectation/'+id,
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
  
  
  export async function createServiceAffectation(token, data){
  const response = await fetch(
      '/DMM/api/create_service_affectation/',
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
  
  
  export async function updateServiceAffectation(token, data, id){
  const response = await fetch(
      '/DMM/api/ubdate_service_affectation/'+id,
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
  
  
  export async function deleteServiceAffectation(token, id){
  const response = await fetch(
      '/DMM/api/delete_service_affectation/'+id,
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
  
  
  
  export async function getServiceAffectationForSelection(token){
    const response = await fetch(
        '/DMM/api/get_all_service_affectation_for_selection/',
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