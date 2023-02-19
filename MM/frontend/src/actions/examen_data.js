export async function getAllExemen(token){

    const response = await fetch(
        '/labo/api/get_all_exmene/',
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
  
  export async function getSelectedExemen(token, id){
  
    const response = await fetch(
      '/labo/api/get_selected_exemen/'+id,
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
  
  
  export async function addNewExemen(token, data){
  const response = await fetch(
      '/labo/api/create_new_exemen/',
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
  
  
  export async function updateExemen(token, data, id){
  const response = await fetch(
      '/labo/api/update_exemen/'+id,
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
  
  
  export async function deleteExemen(token, id){
  const response = await fetch(
      '/labo/api/delete_exemen/'+id,
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



  export async function getAllExamenOfMonth(token, month, year){
    const response = await fetch(
        '/labo/api/get_all_exmene_of_month/' +month+ '/'+ year,
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





  export async function addNewTest(token, data){
    const response = await fetch(
        '/labo/api/create_new_test/',
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
    
    
    export async function updateTest(token, data, id){
    const response = await fetch(
        '/labo/api/update_test/'+id,
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
    
    
    export async function deleteTest(token, id){
    const response = await fetch(
        '/labo/api/delete_exemen/'+id,
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


    export async function deleteTestOfExamen(token, id){
      const response = await fetch(
          '/labo/api/delete_test_of_examen/'+id,
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



      export async function getAllExamenOfMonthForLabo(token, month, year){
        const response = await fetch(
            '/labo/api/get_all_exmene_of_month_labo/' +month+ '/'+ year,
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