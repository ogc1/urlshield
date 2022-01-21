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
   url_id integer FOREIGN KEY REFERENCES url_map(_id)
   log_id integer FOREIGN KEY REFERENCES basic_logs(_id),
   browserName
   browserVersion
   visitor_id
   device
   os
   incognito
   language
   languages_str
   useragent
   vendor
   platform
   mobile
   uad_mobile
   uad_platform
   height
   width
   pixel depth
   color depth
   pixel ratio
   nav app
   device mem
   hardware concurrency
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

CLEAN WAY TO VIEW LOGS

SELECT l._id AS log_id, u.short_url, u.destination_url, l.log_timestamp, l.ip_address
FROM url_map u
INNER JOIN basic_logs l
ON u._id = l.url_id
WHERE SHORT_URL = 'htgdtf';