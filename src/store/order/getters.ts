import type { StateType } from "./types";

export default {
  getList: (state: StateType) => {
    return state?.list
  },
}
