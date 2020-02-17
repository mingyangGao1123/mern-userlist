# mern-userlist

Problem 1: 

Async problem in edit, delete and create user.

For users, redux should only have 1 state, but I write 3 differnet states (edit reducer, delete reducer, add reducer).

So I only need two reducers to manage the state. 

One is user ---> to manage the user datail state.

The other is users ---> to manege the userlist state.

Promlem 2:

Dispatch action is syncoronous. So async funciton does not work.

We can dispatch action and do history.push('/') in the action.
