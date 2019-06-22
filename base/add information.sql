use APITP2;
insert into users (name, lastname, age, email, password, zone)
values ('nicole','zimerman',24,'nzimer@gmail.com','admin1234','almagro')

insert into users (name, lastname, age, email, password, zone)
values ('facundo','aguero',21,'faguero@gmail.com','admin1234','devoto')

insert into users (name, lastname, age, email, password, zone)
values ('lionel','messi',35,'messi@gmail.com','admin1234','palermo')

insert into users (name, lastname, age, email, password, zone)
values ('juan','perez',28,'perez@gmail.com','admin1234','almagro')


insert into publications (title, description, category, zone, keyword, state, owner, reservedby,image)
values ('sillon','sillon dos plazas','muebles','almagro','sillon','finished',1,2,null)

insert into publications (title, description, category, zone, keyword, state, owner, reservedby,image)
values ('heladera','heladera negra marca whirpool','electrodomesticos','almagro','heladera','available',1,null,null)

insert into publications (title, description, category, zone, keyword, state, owner, reservedby,image)
values ('mesa','mesa madera de 2m x 1,20m','muebles','devoto','sillon','reserved',2,1,null)

select * from publications;
select * from users;
