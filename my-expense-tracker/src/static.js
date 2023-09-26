const USERS = {
  6: {
    firstName: 'John',
    lastName: 'Doe',
    time_created_at: 6,
    id: 6,
  },
  1: {
    firstName: 'Jane',
    lastName: 'Smith',
    time_created_at: 1,
    id: 1,
  },
  2: {
    firstName: 'Alice',
    lastName: 'Wong',
    time_created_at: 2,
    id: 2,
  },
  3: {
    firstName: 'Bob',
    lastName: 'Johnson',
    time_created_at: 3,
    id: 3,
  },
  4: {
    firstName: 'Charlie',
    lastName: 'Brown',
    time_created_at: 4,
    id: 4,
  },
  5: {
    firstName: 'Diana',
    lastName: 'Ross',
    time_created_at: 5,
    id: 5,
  }
};

const EXPENSES = {
  1: { userId: 5, category: 'Food', description: 'Lunch at Italian restaurant', cost: 50.23, id: 1, time_created_at: 1 },
  2: { userId: 4, category: 'Activity', description: 'Entry tickets to the local theme park', cost: 40.50, id: 2, time_created_at: 2 },
  3: { userId: 3, category: 'Food', description: 'Organic fruits and vegetables', cost: 20.75, id: 3, time_created_at: 3 },
  4: { userId: 2, category: 'Activity', description: 'Cinema tickets for a new release', cost: 15.00, id: 4, time_created_at: 4 },
};

const CATEGORIES = [
    "Food", 
    "Activity", 
    "Office Equipment"
];
  export {USERS, EXPENSES, CATEGORIES};