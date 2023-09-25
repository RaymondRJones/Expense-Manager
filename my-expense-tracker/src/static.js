const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      time_created_at: '2023-09-25T09:30:00',
      total_expenses: 100
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      time_created_at: '2023-09-20T10:15:00',
      total_expenses: 250
    },
    {
      firstName: 'Alice',
      lastName: 'Wong',
      time_created_at: '2023-09-15T14:00:00',
      total_expenses: 320
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      time_created_at: '2023-09-10T08:45:00',
      total_expenses: 50
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      time_created_at: '2023-09-05T12:30:00',
      total_expenses: 175
    },
    {
      firstName: 'Diana',
      lastName: 'Ross',
      time_created_at: '2023-09-01T16:00:00',
      total_expenses: 220
    }
  ];
  
  const expenses = [
    { user_time_created: 1632582390000, category: 'Groceries', description: 'Weekly groceries', cost: 50.23 },
    { user_time_created: 1632582390001, category: 'Utilities', description: 'Electricity bill', cost: 40.50 },
    { user_time_created: 1632582390002, category: 'Transport', description: 'Gas for the car', cost: 20.75 },
    { user_time_created: 1632582390003, category: 'Entertainment', description: 'Movie tickets', cost: 15.00 },
  ];
  
  export {users, expenses};