/** Extract generic type from array */
export type Unarray<T> = T extends Array<infer U> ? U : T;

/** T or an array of T */
export type MayBeArray<T> = T | T[];

/** Make some fields that might have been optional become required fields */
export type RequiredSome<T, RequiredFields extends keyof T> = {
  [Field in Exclude<keyof T, RequiredFields>]?: T[Field];
} &
  {
    [Field in RequiredFields]-?: T[Field];
  };

/** Signature of an identity function */
export type IdentityFunction<T> = (value: T) => T;

/** Union types of all values from a map type */
export type ValueOf<T> = T[keyof T];
