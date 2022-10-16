async function getData() {
  let response = await fetch(
    import.meta.url + '/../Http.php',
    {
      body: JSON.stringify({
        user_money: 110,
        user_name: 'user_1',
      }),
      method: 'post',
    }
  );
  let data = await response.json();
  
  if (!data.length) {
    console.log('Empty');
  }
  
  console.log(data);
}

// getData();




async function login() {
  let response = await fetch(
    import.meta.url + '/../Http.php',
    {
      body: JSON.stringify({
        user_name: prompt('Enter name'),
        user_password: prompt('Enter password'),
      }),
      method: 'post',
    }
  );
  let data = await response.text();
  
  
  
  
  
  
  console.log(data);
  
  
}


login();







