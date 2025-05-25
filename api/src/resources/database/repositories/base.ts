import { Model, Document, FilterQuery, UpdateQuery, QueryOptions, Types } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  protected toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === 'string' ? new Types.ObjectId(id) : id;
  }

  toObject(docOrDocs: T | T[] | null) {
    if (docOrDocs === null) return null;
    if (Array.isArray(docOrDocs)) {
      return docOrDocs.map((doc) => doc.toObject());
    }
    return docOrDocs.toObject();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string | Types.ObjectId, projection?: any, options?: QueryOptions): Promise<T | null> {
    return this.model.findById(this.toObjectId(id), projection, options).exec();
  }

  async findOne(filter: FilterQuery<T>, projection?: any, options?: QueryOptions): Promise<T | null> {
    return this.model.findOne(filter, projection, options).exec();
  }

  async find(filter: FilterQuery<T>, projection?: any, options?: QueryOptions): Promise<T[]> {
    return this.model.find(filter, projection, options).exec();
  }

  async updateById(id: string | Types.ObjectId, update: UpdateQuery<T>, options?: QueryOptions): Promise<T | null> {
    return this.model.findByIdAndUpdate(this.toObjectId(id), update, { new: true, ...options }).exec();
  }

  async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<{ acknowledged: boolean; modifiedCount: number }> {
    return this.model.updateMany(filter, update).exec();
  }

  async deleteById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(this.toObjectId(id)).exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.model.deleteMany(filter).exec();
  }

  async count(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    return this.model.exists(filter).then((doc) => !!doc);
  }
}
