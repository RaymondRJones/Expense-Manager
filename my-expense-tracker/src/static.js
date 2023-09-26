const USERS = {
  6: {
    firstName: 'John',
    lastName: 'Doe',
    id: 6,
  },
  1: {
    firstName: 'Jane',
    lastName: 'Smith',
    id: 1,
  },
  2: {
    firstName: 'Alice',
    lastName: 'Wong',
    id: 2,
  },
  3: {
    firstName: 'Bob',
    lastName: 'Johnson',
    id: 3,
  },
  4: {
    firstName: 'Charlie',
    lastName: 'Brown',
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
  1: { userId: 5, category: 'Food', description: 'Lunch at Italian restaurant', cost: 50.23, id: 1 },
  2: { userId: 4, category: 'Activity', description: 'Entry tickets to the local theme park', cost: 40.50, id: 2 },
  3: { userId: 3, category: 'Food', description: 'Organic fruits and vegetables', cost: 20.75, id: 3 },
  4: { userId: 2, category: 'Activity', description: 'Cinema tickets for a new release', cost: 15.00, id: 4 },
};

const CATEGORIES = [
    "Food", 
    "Activity", 
    "Office Equipment"
];
  export {USERS, EXPENSES, CATEGORIES};