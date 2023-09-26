const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      time_created_at: Math.floor(new Date('2023-09-25T09:30:00').getTime() / 1000),
      total_expenses: 100
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      time_created_at: Math.floor(new Date('2023-09-26T09:30:00').getTime() / 1000),
      total_expenses: 250
    },
    {
      firstName: 'Alice',
      lastName: 'Wong',
      time_created_at: Math.floor(new Date('2023-09-27T09:30:00').getTime() / 1000),
      total_expenses: 320
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      time_created_at: Math.floor(new Date('2023-09-28T09:30:00').getTime() / 1000),
      total_expenses: 50
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      time_created_at: Math.floor(new Date('2023-09-29T09:30:00').getTime() / 1000),
      total_expenses: 175
    },
    {
      firstName: 'Diana',
      lastName: 'Ross',
      time_created_at: Math.floor(new Date('2023-08-02T09:30:00').getTime() / 1000),
      total_expenses: 220
    }
  ];

const expenses = [
{ user_time_created: 1695652200, category: 'Groceries', description: 'Weekly groceries', cost: 50.23 },
{ user_time_created: 1695652200, category: 'Utilities', description: 'Electricity bill', cost: 40.50 },
{ user_time_created: 1695652200, category: 'Transport', description: 'Gas for the car', cost: 20.75 },
{ user_time_created: 1695652200, category: 'Entertainment', description: 'Movie tickets', cost: 15.00 },
];

const CATEGORIES = [
    "Food", 
    "Activity", 
    "Office Equipment"
];
  export {users, expenses, CATEGORIES};