export async function getAllExemenTEst(token){
    console.log("token",token);

    const response = await fetch(
        '/labo/api/get_all_exmene_test/',
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
  
  export async function getSelectedExemenTest(token, id){
  
    const response = await fetch(
      '/labo/api/get_selected_exemen_test/'+id,
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
  
  
  export async function addNewExemenTest(token, data){
  const response = await fetch(
      '/labo/api/create_new_exemen_test/',
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
  
  
  export async function updateExemenTest(token, data, id){
  const response = await fetch(
      '/labo/api/update_exemen_test/'+id,
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
  
  
  export async function deleteExemenTest(token, id){
  const response = await fetch(
      '/labo/api/delete_exemen_test/'+id,
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
  
  
  
  export async function getAllTestesTypesForSelect(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/labo/api/get_all_exemen_test_types_to_select/',
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


  export async function getTestesForSelectedType(token, exm_type){
    console.log("inside methode", token)
    const response = await fetch(
        '/labo/api/get_all_exemen_test_of_type/' + exm_type,
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


  export async function getLastExemenTest(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/labo/api/get_last_exemen_test/',
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
      console.log("get the data succesfully", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`);
      });
      return "no data";
    }
  
  };




  export async function getTestDetailsForSelectedExam(token, id){
  
    const response = await fetch(
      '/labo/api/get_test_details_of_exam/'+id,
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