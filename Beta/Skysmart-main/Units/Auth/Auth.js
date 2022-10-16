let url = `${import.meta.url}/../Auth.php`;




async function login(user_name, user_password) {
  let response = await fetch(
    `${url}?method=login`,
    {
      body: JSON.stringify({
        user_name,
        user_password,
      }),
      method: 'post',
    },
  );
  let data = await response.json();
  
  console.log(data);
}


async function test() {
  let response = await fetch(
    url,
    {
      body: JSON.stringify({
        user_name: prompt('Enter name'),
      }),
      method: 'post',
    }
  );
  let data = await response.text();
  
  
  console.log(data);
  
  
}




test();

