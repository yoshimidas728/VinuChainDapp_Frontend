import { createSelector } from "reselect";

const selectLoginDomain = (state) => state[("auth", "post", "autorize")];

export const makeSelectAuthToken = () =>
  createSelector(selectLoginDomain, (globalState) => globalState.token);
