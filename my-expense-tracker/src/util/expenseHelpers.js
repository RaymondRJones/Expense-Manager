import React, { useState, useEffect } from 'react';

export const computeInitialTotals = (expensesState) => {
    return Object.values(expensesState).reduce((acc, expense) => {
      acc[expense.user_time_created] = (acc[expense.user_time_created] || 0) + expense.cost;
      return acc;
    }, {});
  };