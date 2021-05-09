# NODEJS CRUD APP WITH MONGODB

## API URL: https://crud-nodejs-codedsam.herokuapp.com/

### [POST] https://crud-nodejs-codedsam.herokuapp.com/

#### Adds new entry to database

##### Example Request Body

{
"name": "John Doe",
"email": "test@email.com",
"country": "India"
}

##### Example Response

{
"message": "Successfully created entry",
"data": {
"name": "John Doe",
"email": "test@email.com",
"country": "India"
}
}

### [GET] https://crud-nodejs-codedsam.herokuapp.com/

#### Retrieves all entries present in the database

##### Example Response

{
"message": "Entries retrieved",
"data": [
{
"_id": "6098294185be960015bd5473",
"name": "Samuel Anozie",
"email": "codedsam@zuri.com",
"country": "Nigeria",
"__v": 0
},
{
"_id": "60982a09eee44100155657bb",
"name": "Xhizu Anozie",
"email": "Xhizu@zuri.com",
"country": "China",
"__v": 0
}
]
}

### [GET] https://crud-nodejs-codedsam.herokuapp.com/{ID}

#### Retrieves entry details for a specific ID

##### Example Response

{
"message": "Entry retrieved",
"data": {
"\_id": "609829f2eee44100155657ba",
"name": "Samuel Anozie",
"email": "codedsam@zuri.com",
"country": "Nigeria",
"\_\_v": 0
}
}

### [PUT] https://crud-nodejs-codedsam.herokuapp.com/{ID}

#### Updates entry details for a specific ID

##### Example Request Body

{
"name": "John Doe",
"email": "test@email.com",
"country": "India"
}

##### Example Response

{
"message": "Successfully updated entry",
"data": {
"name": "John Doe",
"email": "test@email.com",
"country": "India"
}
}

### [DELETE] https://crud-nodejs-codedsam.herokuapp.com/{ID}

#### Deletes entry for a specific ID

##### Example Response

{
"message": "Entry deleted successfully.",
"data": {}
}
