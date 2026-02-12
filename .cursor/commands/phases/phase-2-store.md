@.cursor-blueprint.md

Create a Vuex 4 module `auth.js` in `src/store` (or `src/store/modules` if using modules). It should have: State: user, isAuthenticated; Mutation: SET_USER; Action: loginUser (use axios to POST to /login). Then create `tests/unit/store/auth.spec.js` that mocks axios and tests both success and fail scenarios for the action.
