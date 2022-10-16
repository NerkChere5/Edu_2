drop table if exists auth;
drop table if exists users;


create table if not exists users (
  email varchar (50),
  id int auto_increment,
  money int default 0,
  name varchar (30),
  password varchar (50),
  
  primary key (id),
  unique key (name, password)
)
engine = InnoDb;


create table if not exists auth (
  user_id int,
  token varchar (100),
  
  foreign key (user_id) references users (id)
    on delete cascade
    on update cascade
)
engine = InnoDb;
