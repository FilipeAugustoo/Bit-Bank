export function resetaCor(...tipo: string[]) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {







    return descriptor;
  }
}
