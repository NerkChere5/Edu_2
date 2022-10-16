import * as Common from '../../Api/Common.js';




export class User {
  static url_authorization = 'https://api-edu.skysmart.ru/api/v2/auth/auth/student';
  static url_get__data = 'https://api-edu.skysmart.ru/api/v1/user/config';
  static url_get__data_registration = 'https://api.randomdatatools.ru/?count=1&params=Email,FirstName,LastName,Phone';
  static url_registration = 'https://api-edu.skysmart.ru/api/v3/auth/registration/student';
  static url_save__data_registration = `${import.meta.url}/../User.php`;
  
  
  
  
  _data_registration = {};
  _id = '';
  _token = '';
  
  
  data_authorization__email = '';
  data_authorization__password = '';
  data_registration__class_letters = 'АБВГ';
  data_registration__class_nums = [5];
  delays = [1000, 5000];
  
  
  
  
  get data_registration_() {
    return this._data_registration;
  }
  
  
  get id() {
    return this._id;
  }
  
  
  get token() {
    return this._token;
  }
  
  
  
  
  async _data_registration__create() {
    let response = await fetch(this.constructor.url_get__data_registration);
    let response_data = await response.json();
    
    this._data_registration = {
      class_letter: Common.sequence_getRandom(this.data_registration__class_letters),
      class_num: Common.sequence_getRandom(this.data_registration__class_nums),
      email: response_data.Email,
      name: response_data.FirstName,
      password: Common.random(1e9, 9e9).toString(),
      phone: response_data.Phone,
      surname: response_data.LastName,
    };
  }
  
  
  async _data_registration__save() {
    let fetch_data = {
      class: this._data_registration.class_num,
      email: this._data_registration.email,
      name: this._data_registration.name + ' ' + this._data_registration.surname,
      password: this._data_registration.password,
    };
    let fetch_opts = {
      body: JSON.stringify(fetch_data, null, 2),
      method: 'post',
    }
    await fetch(this.constructor.url_save__data_registration, fetch_opts);
  }
  
  
  
  
  async authorization() {
    if (this._token) return;
    
    let fetch_opts = {
      body: JSON.stringify({
        password: this.data_authorization__password,
        phoneOrEmail: this.data_authorization__email,
      }),
      method: 'post',
    };
    let response = await fetch(this.constructor.url_authorization, fetch_opts);
    let response_data = await response.json();
    this._token = response_data.jwtToken;
  }
  
  
  async data_define() {
    let response = await this.fetch(this.constructor.url_get__data);
    let response_data = await response.json();
    this._id = response_data.userId;
  }
  
  
  fetch(url, opts = {}) {
    opts.headers = {
      ...opts.headers,
      'Authorization': `Bearer ${this._token}`,
    };
    return fetch(url, opts);
  }
  
  
  async registration() {
    if (this._token) return;
    
    let response = null;
    await this._data_registration__create();
    
    while (true) {
      let fetch_opts = {
        body: JSON.stringify({
          classLetter: this._data_registration.class_letter,
          classNumber: this._data_registration.class_num,
          email: this._data_registration.email,
          isOfferAccepted: true,
          name: this._data_registration.name,
          parentPhone: this._data_registration.phone,
          password: this._data_registration.password,
          surname: this._data_registration.surname,
        }),
        method: 'post',
      };
      response = await fetch(this.constructor.url_registration, fetch_opts);
      
      if (response.status == 200) break;
      
      this._data_registration.email += Common.random(0, 9);
      await Common.delay(Common.random(...this.delays));
    }
    
    let response_data = await response.json();
    this._token = response_data.jwtToken;
    
    // await this._data_registration__save();
  }
}
