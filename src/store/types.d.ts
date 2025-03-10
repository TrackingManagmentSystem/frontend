export type State<T> = {
  loading: boolean;
  list: T[];
  actual: T | null;
};

export type Action<T> = {
  loadList: (...args: any[]) => Promise<T[]>;
};
