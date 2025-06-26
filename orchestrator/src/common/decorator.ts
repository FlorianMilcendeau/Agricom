export function StaticImplements<T>() {
  return <U extends T>(_constructor: U) => {
    // No operation needed; this is just for type checking
  };
}
