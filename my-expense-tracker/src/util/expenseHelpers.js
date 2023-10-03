export const computeInitialTotals = (expensesState) => {
  return Object.values(expensesState).reduce((acc, expense) => {
    acc[expense.userId] = (acc[expense.userId] || 0) + expense.cost;
    return acc;
  }, {});
};

export const adjustBudgetForUser = (prevTotals, userId, adjustment) => {
  return {
    ...prevTotals,
    [userId]: (prevTotals[userId] || 0) + adjustment
  };
};

export const adjustBudgetForUserSwitch = (prevTotals, oldUserId, newUserId, amount) => {
  const oldUserTotal = (prevTotals[oldUserId] || 0) - amount;
  const newUserTotal = (prevTotals[newUserId] || 0) + amount;
  return {
    ...prevTotals,
    [oldUserId]: oldUserTotal,
    [newUserId]: newUserTotal
  };
};
