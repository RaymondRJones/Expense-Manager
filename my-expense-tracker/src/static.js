const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      time_created_at: 6,
      total_expenses: 100
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      time_created_at: 1,
      total_expenses: 250
    },
    {
      firstName: 'Alice',
      lastName: 'Wong',
      time_created_at: 2,
      total_expenses: 320
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      time_created_at: 3,
      total_expenses: 50
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      time_created_at: 4,
      total_expenses: 175
    },
    {
      firstName: 'Diana',
      lastName: 'Ross',
      time_created_at: 5,
      total_expenses: 220
    }
  ];

const expenses = [
  { user_time_created: 5, category: 'Food', description: 'Weekly groceries', cost: 50.23, time_created_at: 1 },
  { user_time_created: 4, category: 'Activity', description: 'Electricity bill', cost: 40.50, time_created_at: 2 },
  { user_time_created: 3, category: 'Food', description: 'Gas for the car', cost: 20.75, time_created_at: 3 },
  { user_time_created: 2, category: 'Activity', description: 'Movie tickets', cost: 15.00, time_created_at: 4 },
];

const CATEGORIES = [
    "Food", 
    "Activity", 
    "Office Equipment"
];
  export {users, expenses, CATEGORIES};