import { useState } from 'react';

const useExpenses = (initialExpenses) => {
    const [expenses, setExpenses] = useState(initialExpenses);

    const add = (newExpense) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [newExpense.id]: newExpense
        }));
    };

    const update = (updatedExpense) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [updatedExpense.id]: updatedExpense
        }));
    };

    const remove = (expenseId) => {
        setExpenses(prevExpenses => {
            const updatedExpenses = { ...prevExpenses };
            delete updatedExpenses[expenseId];
            return updatedExpenses;
        });
    };

    const removeAllForUser = (deletedUserId) => {
        setExpenses(prevExpenses => {
            const updatedExpenses = { ...prevExpenses };
            for (let expenseCreatedAt in updatedExpenses) {
                if (updatedExpenses[expenseCreatedAt].userId === deletedUserId) {
                    delete updatedExpenses[expenseCreatedAt];
                }
            }
            return updatedExpenses;
        });
    };

    return [expenses, { add, update, remove, removeAllForUser }];
}

export default useExpenses;
