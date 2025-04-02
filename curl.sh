#Create User
# curl -H 'Content-Type: application/json' \
#       -d '{ "email":"cendrillon@proton.fr","password":"10citrouille54", "firstName":"cendy", "lastName":"gitane"}' \
#       -X POST http://localhost:3001/api/v1/user

#Delete

curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNlbmRyaWxsb25AcHJvdG9uLmZyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDM2MDU1NzAsImV4cCI6MTc0MzYwOTE3MH0.-CStOmdIrZevtpf0SHJH2NEdy8LXiqSBzfo7B7kG_tI" \  -X DELETE http://localhost:3001/api/v1/user/2

#get Token
# curl -H 'Content-Type: application/json' \
#       -d '{ "email":"cendrillon@proton.fr","password":"10citrouille54"}' \
#       -X POST http://localhost:3001/api/v1/user/login

#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWplQHByb3Rvbi5mciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQzNjAzNTE1LCJleHAiOjE3NDM2MDcxMTV9.iHY3QYs3SzXoYe_kAR8qPKFXhzKFPa31WKcGQ1e5Z7g

#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNlbmRyaWxsb25AcHJvdG9uLmZyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDM2MDU1NzAsImV4cCI6MTc0MzYwOTE3MH0.-CStOmdIrZevtpf0SHJH2NEdy8LXiqSBzfo7B7kG_tI