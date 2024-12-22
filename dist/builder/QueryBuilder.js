"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query); // Copy the query object
        // Exclude non-filterable fields
        const excludeFields = ['search', 'sortBy', 'sortOrder'];
        excludeFields.forEach((field) => delete queryObj[field]);
        // Apply specific filters like 'authorId'
        if (queryObj.filter) {
            const filterField = 'author'; // The field you want to filter on
            this.modelQuery = this.modelQuery.find({
                [filterField]: queryObj.filter,
            });
        }
        else {
            // Apply other filters dynamically
            this.modelQuery = this.modelQuery.find(queryObj);
        }
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy || 'createdAt';
        const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
        this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
        return this;
    }
}
exports.default = QueryBuilder;
