Test game and server to experiment.

## TokenGenerator
C# application that connects to the NodeJS server and sends your motherboard serial ID as a validator. If banned you will no longer
be allowed to generate keys.

## server
NodeJS server which handles requests from the C# application and generates tokens to allow login.

## Website
Currently only contains a login page that requires a token to be generated for account creation and login.
If your motherboard ID is banned you will no longer be able to create a token on that PC.
