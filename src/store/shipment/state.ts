import type { StateType } from "./types";

export default (): StateType => ({
  loading: false,
  list: [],
  actual: null,
})
