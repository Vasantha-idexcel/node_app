Step 1 - Clone the app and install all requied npm modules by using the command
    
    npm install
    
Step 2 - Add .env file inside node_app folder. Or rename 'env.example' file to '.env'

Step 3 - Run the application with the command

    npm start

NODE APP

This app contains 4 models - User, Borrower, Division and Collaterals. User model is for user sign up and authentication. Borrower, Division and Collateral models are linked with each other using mongoose - refs association.

Api's Available:

1. User Sign Up - POST - /api/v1/signup
    
    {
        "user": {
            "email": "sample@gmail.com",
            "password": "Password"
        }
    }
