# Running the project

clone

`git clone https://github.com/RaymondRJones/leandata-take-home.git`

Cd into project directory, install and start

`cd my-expense-tracker`
`npm install`
`npm start`

# Summary

This application is an expense tracker as a single page application.

It's comprised of a User Management section that allows adding, editing, and deleting of users while displaying their total expenses. It has an Expense Management section that allows adding, editing, and deleting of expenses. Changes to expenses show immediate changes to the user's total expenses. Finally, there's an expense summary section that displays the spending categories by their totals. 

This project was coded using react and styled using the materials UI. 

# Design Tradeoffs

For the component design, there's a parent function called MainScreen which holds the three components mentioned in the summary. The MainScreen component initializes dummy data using constants made in static.js. It tracks all the changes to Users and Expenses and passes the data down so that state is consistent as changes occur. 

**Hash Map vs. Array**

A hashmap was used because it has O(1) insertions, edits, and deletions. An array could also be used but it limited to O(1) amortized time complexity for adding a new user. The array would need to double in size several times, or be instantiated at a really large size. The other problem with using an array of users and expenses is that they need their own IDs.

If the dataset is quite large, as described in the project email description, generating a series of IDs can get difficult. 

For these reasons, a hashmap was chosen to hold the users and expenses data. Although, it's worth noting that an array can be an excellent choice if there's no care of having empty memory or userID conflicts by importing a library to handle it. 

**Primary Keys: Timestamps vs. IDs**

React requires each list item to have it's own primary key. IDs are great and there's libraries that can create stable ID generation. I decided to go with using timestamps as the primary, unique key for users and expenses. 

I did this because I wanted to create this application quite quickly. Given more time, importing an ID library is likely the best because it can handle conflicts very well. Theoretically, if several users are using this application and it gets connected to a backend in the future, two users could have several timestamps. And most users likely won't be using the application from 2AM to 6AM for example.

Overall, I would switch to an ID generation library and use that as the primary, unique keys of the hashmap. 

# Component Design

#### Component Design - User Management

Another big decision for react applications is deciding how the component hierarchy should be structured. Instead of having a single user component, I chose to break it into two components, one for the input form and one that displays the table of user data. 

This helped improve readability and therefore maintainability. It helped modularize the components and follow React's philosophy. 

This has the risk of adding more files, but it will help the overall readability of the project. 

This could even be abstracted further to create a general Dialog component to use for both users and expenses. But there isn't enough time for that. But it would improve the reusability for future additions to this project. 

#### Component Design - Expense Management

This follows the same idea as the User Management. To improve possible reusability and reduce the overall code in a single file, it was broken into two different components.
