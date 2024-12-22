import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // Copy the query object

    // Exclude non-filterable fields
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Apply specific filters like 'authorId'
    if (queryObj.filter) {
      const filterField = 'author'; // The field you want to filter on
      this.modelQuery = this.modelQuery.find({
        [filterField]: queryObj.filter as string,
      });
    } else {
      // Apply other filters dynamically
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;

    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }
}

export default QueryBuilder;
