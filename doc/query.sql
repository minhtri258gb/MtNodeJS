SELECT id, first_name, last_name, special_name, gender, birthday, phone, email, tag, address, address_lat, address_lng
FROM person p;


SELECT id,first_name,last_name,special_name,gender,birthday,phone,email,tag,address,address_lat,address_lng
FROM person
WHERE 1=1
ORDER BY time desc
LIMIT 0, 17