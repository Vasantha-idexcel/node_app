Step 1 - Clone the app and install all requied npm modules by using the command
    
    npm install
    
Step 2 - Add .env file inside node_app folder. Or rename 'env.example' file to '.env'

Step 3 - Make sure mongod server is running on Port - 27017

Step 4 - Run the application with the command

    npm start

NODE APP

This app contains 4 models - User, Borrower, Division and Collaterals. User model is used for user sign up and authentication. Borrower, Division and Collateral models are linked with each other using mongoose - refs association.

1. mongoose npm module is used to connect and interact with the mongodb database.
2. bcryptjs npm module is used to hash the user's password.
3. validator npm module is used to validate Mongoose models.
4. jsonwebtoken, passport and passport-jwt are the npm modules used for user authentication.
5. nodemailer npm module is used for sending user confirmation email.

Api's Available:

User APIs

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
    
    NOTE: Bearer token should be attached to the header. This tokwn is used to authenticate the user trying to access the apis.

Borrower APIs
    
1. List Borrowers - GET - /api/v1/borrowers
    
    Will list all the borrowers created.

2. Create Borrower - POST - /api/v1/borrowers
    
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

3. Fetch Borrower - GET - /api/v1/borrowers/:id

    Is used to fetch a specific Borrower.

4. Update Borrower - PATCH - /api/v1/borrowers/:id

    Is used to update a specific Borrower.

    ```json
    {
        "borrower": {
            "client_name": "test_client_1",
            "client_number": "test_client_1",
            "email": "test_client_1@idx.com"
        }
    }
    ```

5. Delete Borrower - DELETE - /api/v1/borrowers/:id

    Is used to delete the specific Borrower.

Division APIs

1. List Divisions - GET - /api/v1/borrowers/:borrower_id/divisions
    
    Will list all the divisions created.

2. Create Division - POST - /api/v1/borrowers/:borrower_id/divisions
    
    Is used to create a new Division.
    
    ```json
    {
        "division": {
            "division_name": "Div1",
            "description": "Division 1"
        }
    }
    ```

3. Fetch Division - GET - /api/v1/borrowers/:borrower_id/divisions/:id

    Is used to fetch a specific Division.

4. Update Division - PATCH - /api/v1/borrowers/:borrower_id/divisions/:id

    Is used to update a specific Division.

    ```json
    {
        "division": {
            "division_name": "Div1",
            "description": "Division 1"
        }
    }
    ```

5. Delete Division - DELETE - /api/v1/borrowers/:borrower_id/divisions/:id

    Is used to delete the specific Division.

Collateral APIs

1. List Collaterals - GET - /api/v1/borrowers/:borrower_id/divisions/:division_id/collaterals
    
    Will list all the collaterals created.

2. Create Collateral - POST - /api/v1/borrowers/:borrower_id/divisions/:division_id/collaterals
    
    Is used to create a new Collateral.
    
    ```json
    {
        "collateral_advance_rate":{
            "collateral_name": "Chennai",
            "sublimit": 10000,
            "advance": 95,
            "source": "Receivable"
        }
    }
    ```

3. Fetch Collateral - GET - /api/v1/borrowers/:borrower_id/divisions/:division_id/collaterals/:id

    Is used to fetch a specific Collateral.

4. Update Collateral - PATCH - /api/v1/borrowers/:borrower_id/divisions/:division_id/collaterals/:id

    Is used to update a specific Collateral.

    ```json
    {
        "collateral_advance_rate":{
            "collateral_name": "Chennai",
            "sublimit": 10000,
            "advance": 95,
            "source": "Receivable"
        }
    }
    ```

5. Delete Collateral - DELETE - /api/v1/borrowers/:borrower_id/divisions/:division_id/collaterals/:id

    Is used to delete the specific Collateral.
