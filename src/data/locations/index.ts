import { State, states } from "./states";

export function getStateCities(state: string) {
  const stateObj = states.find((s: State) => s.name === state);
  if (stateObj) {
    return stateObj.cities;
  }
  return [];
}

export function getStates() {
  return states;
}
