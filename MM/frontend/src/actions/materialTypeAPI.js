export async function getMaterielType(token){

    const response = await fetch(
        '/DMM/api/get_all_material_type/',
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
  
  export async function getSelectedMaterielType(token, id){
  
    const response = await fetch(
      '/DMM/api/get_selected_material_type/'+id,
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
  
  
  export async function createMaterialType(token, data){
  const response = await fetch(
      '/DMM/api/create_material_type/',
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
  
  
  export async function updateMaterialType(token, data, id){
  const response = await fetch(
      '/DMM/api/ubdate_material_type/'+id,
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
  
  
  export async function deleteMaterialType(token, id){
  const response = await fetch(
      '/DMM/api/delete_material_type/'+id,
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
  
  
  
  export async function getMaterielTypeForSelection(token){
    const response = await fetch(
        '/DMM/api/get_all_material_type_for_selection/',
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