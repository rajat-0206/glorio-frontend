## Parking Management System

Project made by <a href="https://itsrajat.xyz">Rajat Shrivastava</a>

<br>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white" />

<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />

<br />
An react based application to book the slot to park the car. Park car in any building with slot available. Easily unpark/free the car and charges will be deducted from your balance. 


## Screenshot (s)



<img src="https://i.ibb.co/VCr6bds/dashboard.jpg" alt="dashboard" border="0">
<center>Dashboard</center>
<br />
<img src="https://i.ibb.co/PWYTqv1/history.jpg" alt="history" border="0">
<center>History</center>
<br />
<img src="https://i.ibb.co/sq3VXH7/login.jpg" alt="login" border="0">
<center>Login</center>
<br />
<img src="https://i.ibb.co/wBkBqGM/signup.jpg" alt="signup" border="0">
<center>Signup</center>

<img src="https://i.ibb.co/Hr8qcRy/add-money.jpg" alt="add-money" border="0">
<center>Add Balance</center>
<br />
<img src="https://i.ibb.co/LR8PB5L/parkcar.jpg" alt="parkcar" border="0">
<center>Park car at free slot</center>
<br />
<img src="https://i.ibb.co/PQ7cjJ3/unparkcar.jpg" alt="unparkcar" border="0">
<center>Unpark car you parked</center>
<br/>


## Installation and Setup Instructions
<ol>
<li> Clone down this repository using following command.</li>

```
git clone https://github.com/rajat-0206/glorio-frontend
```

<li> You will need `node` and `npm` installed globally on your machine.  Install it from <a href="https://node.org/downloads">here</a>.</li>


<li> Install the required package using following command.</li>

```
npm install
``` 

5. Start server using following command

```
npm start 
```
5. Visit the following url to browse web app.

`localhost:3000`  

## Functionalties

  - Register
  - Login
  - Verify mail-id through email
  - Add Money
  - Park Car
  - Unpark Car
  - View History
  

## Flow of Control
 - First of all user will create his account. Emailid, password and name is required to create a account.
 - Password should be 8 letters long and should include a capital letter, a small letter, a special symbol and a number.
 - A mail is sent to the registered mail. User need to click on the link in order to verify his/her email. Login can be done after verification.
 - User can login with his/her credentials
 - User can add money to his wallet.
 - User can park his/her car at any avilable slot.
 - User will be shown all the slots available building wise. The slots which are already parked at shown with red and those which are free are in green.
 - User can unpark/free only his/her car.
 - User can see parking history. History will show the arrival time, the departure time and the charges of parking.