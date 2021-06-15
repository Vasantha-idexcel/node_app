Step 1 - Clone the app and install all requied npm modules by using the command
    
    npm install
    
Step 2 - Add .env file inside node_app folder. Or rename 'env.example' file to '.env'

Step 3 - Run the application with the command

    npm start

NODE APP

This app contains 4 models - User, Borrower, Division and Collaterals. User model is for user sign up and authentication. Borrower, Division and Collateral models are linked with each other using mongoose - refs association.

Api's Available:

1. User Sign Up - POST - /api/v1/signup

    Will send confirmation mail to the given email.

    ```json
    {
        "user": {
            "email": "sample@gmail.com",
            "password": "Password"
        }
    }
    ```
 
2. Confirm Account - GET - /api/v1/activate/:token

    Will activate the account linked to the email.

3. Login - POST - /api/v1/login

    Will generate a Bearer token that can be used to authenticate all other apis.
    
    ```json
    {
        "user": {
            "email": "sample@gmail.com",
            "password": "Password"
        }
    }
    ```
    
NOTE: Bearer <token> should be attached to the header. This tokwn is used to authenticate the user trying to access the apis.
    
4. List Borrowers - GET - /api/v1/borrowers
    
    Will list all the borrowers created.

5. Create Borrower - POST - /api/v1/borrowers
    
    Is used to create a new Borrower.
    
    ```json
    {
        "borrower": {
            "client_name": "test_client_1",
            "client_number": "test_client_1",
            "email": "test_client_1@idx.com"
        }
    }
    ```
