export class CleanFilters {
  static clean<T>(filter: T) {
    return Object.fromEntries(
      Object.entries(filter).filter(([, value]) => value !== undefined),
    );
  }
}
