## API REST - Users Registration - NodeJs | Express | MySQL | Prisma

### It is a REST API for registering users on a system.

### - About

- This project was done with NodeJs and Express framework. The database I used to register was MySQL and also Prisma as ORM.

- To handle the requests, I created the use cases layer that contains the folders responsible for each thing. Each one with one file of controller and one of service. The controller file just manages request and send the data to service, that in turn, communicates with the user model to perform the operation on database.

- The user model was created just to abstract communication with the database to a separated module, and take responsibility away from the 'use cases' layer.

- All tests were done through Insomnia, which makes requests for all methods.


## - Example image

![Example image](https://github.com/Lucas0204/NodeJs-API-Users-Resgistration/blob/main/to_README/Node-API-Example.PNG)
