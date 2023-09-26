# Running the project

Node version v20.5.1 was used for this project.

clone

`git clone https://github.com/RaymondRJones/leandata-take-home.git`

Cd into project directory

`cd my-expense-tracker`

install
`npm install`

start the app 
`npm start`

# Summary

This application is an expense tracker as a single page application.

It's made of three main components. First, a User Management section that allows adding, editing, and deleting of users while displaying their total expenses. Second, it has an Expense Management section that allows adding, editing, and deleting of expenses. Changes to expenses show immediate changes to the user's total expenses. Finally, there's an expense summary section that displays the spending categories by their totals. 

This project was coded using react and styled using the materials UI. The rest of this document will detail design tradeoffs and some notes how components were made.  

# Design Tradeoffs

For the component design, a parent componet is used to hold and structure the three sections. MainScreen.js defines this component. The MainScreen component initializes dummy data using constants made in static.js. It tracks all the changes to Users and Expenses and passes the data down so that state is consistent as changes occur. 

Upon reading this code, you will notice two big design decisions that affect the time complexity of this application.

### Hash Map vs. Array

A hashmap was used because it is O(1) for insertions, edits, and deletions. An array could also be used but it limited to O(1) amortized time complexity for adding a new user. The array would need to double in size several times, or be instantiated at a really large size to match the hashmap. The other problem with using an array of users and expenses is that they need their own IDs.

If the dataset is quite large, as described in the project email description, generating a series of indexes can get difficult. 

For these reasons, a hashmap was chosen to hold the users and expenses data. Although, it's worth noting that an array can be an excellent choice if there's no care of having empty memory or userID conflicts by importing a library or server to handle ID incrementation. Also, a hashmap can still have hashing conflicts that can make is O(N) for adding, editing, and deleting if the hasing algorithm is poor quality. In most cases, I believe the hashmap will be quite strong for performance. 

### Primary Keys: Timestamps vs. IDs

React requires each list item to have it's own primary key, and it doesn't like using list index's as primary keys because lists can often change. An ID generation tool is great, and there's libraries that can create stable ID generation. Using sequential order can create conflicts if two users are created at the same time. Because of this, I used the uuid library that will structure ID's like `f47ac10b-58cc-4372-a567-0e02b2c3d479`

Another consideration was using timestamps which are close to random and have a low chance of conflicts. Timestamps for unique IDs fails when we have a large scale of users and several are created at the same time. Also, most users won't be online from 12AM to 6AM, so the possible numbers are even more limited. 

Importing an id library takes a little more time and risks having an extra dependency in the application. However, it's the best method for preventing any conflicts, so I used it for this application.

# Component Design

### Component Design - User Management

Another big decision for react applications is deciding how the component hierarchy should be structured. Instead of having a single user component, I chose to break it into two components, one for the input form and one that displays the table of user data. 

This helped improve readability and therefore maintainability. It helped modularize the components and follow React's philosophy. 

This has the risk of adding more files, but it will help the overall readability of the project. 

This could even be abstracted further to create a general Dialog component to use for both users and expenses. But there isn't enough time for that. But it would improve the reusability for future additions to this project. 

### Component Design - Expense Management

This follows the same idea as the User Management. To improve possible reusability and reduce the overall code in a single file, it was broken into two different components.


# Future Considerations

There's several functions that could be broken into util functions to further simplify the code and improve the overall maintainability. However, these take more time to implement. So, they have to be left for the future.

Also, it'd be nice to have a constants file that contains all of the text of common HTML. Like, HEADER="Expense Tracker" so it can be imported and reused into multiple places. Ideally this would be done for every instance of hard coded constants. Again, in the interest of time, these can't happen right now. But with more time, this would be a very good next step.