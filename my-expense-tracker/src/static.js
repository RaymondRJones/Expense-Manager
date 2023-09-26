const users = {
  6: {
    firstName: 'John',
    lastName: 'Doe',
    time_created_at: 6,
  },
  1: {
    firstName: 'Jane',
    lastName: 'Smith',
    time_created_at: 1,
  },
  2: {
    firstName: 'Alice',
    lastName: 'Wong',
    time_created_at: 2,
  },
  3: {
    firstName: 'Bob',
    lastName: 'Johnson',
    time_created_at: 3,
  },
  4: {
    firstName: 'Charlie',
    lastName: 'Brown',
    time_created_at: 4,
  },
  5: {
    firstName: 'Diana',
    lastName: 'Ross',
    time_created_at: 5,
  }
};

const expenses = {
  1: { user_time_created: 5, category: 'Food', description: 'Lunch at Italian restaurant', cost: 50.23, time_created_at: 1 },
  2: { user_time_created: 4, category: 'Activity', description: 'Entry tickets to the local theme park', cost: 40.50, time_created_at: 2 },
  3: { user_time_created: 3, category: 'Food', description: 'Organic fruits and vegetables', cost: 20.75, time_created_at: 3 },
  4: { user_time_created: 2, category: 'Activity', description: 'Cinema tickets for a new release', cost: 15.00, time_created_at: 4 },
};

const CATEGORIES = [
    "Food", 
    "Activity", 
    "Office Equipment"
];
  export {users, expenses, CATEGORIES};