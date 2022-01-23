CREATE TABLE location_logs (
   _id serial PRIMARY KEY,
   url_id integer REFERENCES url_map(_id),
   log_id integer REFERENCES basic_logs(_id),
   timezone varchar(50),
   country_name varchar(50),
   country_code varchar(50),
   country_flag_emoji varchar(100),
   region_code varchar(50),
   region_name varchar(50),
   city varchar(50),
   zip varchar(50),
   latitude varchar(50),
   longitude varchar(50),
   formatted_address varchar(50)
);

CREATE TABLE client_logs (
   _id serial PRIMARY KEY,
   url_id integer REFERENCES url_map(_id),
   log_id integer REFERENCES basic_logs(_id),
   visitor_id varchar(100),
   visitor_found boolean,
   browser_name varchar(100),
   browser_version varchar(100),
   device varchar(100),
   incognito boolean,
   os varchar(100),
   osversion varchar(200),
   language_id varchar(100),
   languages_str varchar(200),
   useragent varchar(500),
   vendor varchar(100),
   platform varchar(100),
   mobile varchar(100),
   screen_height varchar(100),
   screen_width varchar(100),
   pixel_depth varchar(100),
   color_depth varchar(100),
   pixel_ratio varchar(100),
   device_mem varchar(100),
   hardware_concurrency varchar(100)
)

CREATE TABLE network_logs (
  _id serial PRIMARY KEY,
  url_id integer REFERENCES url_map(_id),
  log_id integer REFERENCES basic_logs(_id),
  ip_address cidr,
  ip_type varchar(50),
  isp varchar(50),
  asn varchar(50),
  vpn boolean,
  proxy boolean,
  tor boolean,
  relay boolean
)

CREATE TABLE session_logs (
  _id serial PRIMARY KEY,
  session_id varchar(200) UNIQUE,
  account_id integer REFERENCES accounts(_id)
);

CREATE TABLE accounts (
  _id serial PRIMARY KEY,
  username varchar(200),
  user_email varchar(200),
  user_pwd varchar(200)
);


-- COMPLETE LOGS --

SELECT *
FROM url_map u
INNER JOIN basic_logs l
ON u._id = l.url_id
INNER JOIN network_logs n
ON l._id = n.log_id
INNER JOIN location_logs geo
ON l._id = geo.log_id
INNER JOIN client_logs c
ON l._id = c.log_id
WHERE u.short_url = $1;