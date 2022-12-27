export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type Common<A, B> = {
  [P in keyof A & keyof B]: A[P] | B[P];
};
