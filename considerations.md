# Scaffoldzoid

A platform for orange aficionado's to connect with buyers and sellers. Deployed [here](https://strategy-scaffold.herokuapp.com).

### Credentials

Buyer:
test.buyer@gmail.com test123

Seller:
test.seller@gmail.com test123

### User Stories:

- A seller can register and edit his profile picture and description.
- A seller can also list different types of oranges availble for sale with their rates.
- A buyer can register and login to see all the sellers available and the different oranges with respective rates.

### Tools used:

- MERN Stack
- Material UI for components
- Mongodb atlas for cloud db
- Redux for state management
- Cloudinary for image hosting
- Heroku for deployment
- Passportjs library for secure authentication

### Considerations

1. Redux for state management
   While the Context API and useReducer hook are perfectly capable of managing states for small to medium sized applications, A dedicated State management tool is almost always recommended as the application grows, some descrepencies are noticed. In this case, I have used Redux.

2. Multiple User role (Buyer and Seller)
   There a few ways this can be handled:
   a. One endpoint which will handle both buyers and sellers
   b. Separate endpoints for Buyer and sellers.
   c. Different applications for buyers and sellers (example: amazon has a different portal for seller)

   Each of the above approaches are valid and depends on the use case to which should be prefered. In the current application Scaffoldzoid, we can expect it to be of medium size, as there is room for extra features for sellers like, analytics, inventory management, etc and for buyers like, cart, order management, etc.

   Features for both the users do not overlap and hence different endpoints as well as different views for them are preferable as it implements separation of concern.

3. Validation.
   Validation of user input can be done either at the frontend or backend or both. In this case I have chosen to do validation at the backend.

4. Maintainablity
   The backend is structured in the following way

   - models
   - routes
   - validation
   - config

   The frontend has a components directory in which separate components are written, making it easy for adding new components or pages. Actions folder comprisis of all the api calls, and reducer contains our state.
