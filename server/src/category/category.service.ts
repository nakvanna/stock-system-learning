import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import { CategoryModel } from './models/category.model';
import { CreateCategoryInput } from './input/create-category.input';
import { CategoryCursorPagination } from './dto/category.dto';
import { UpdateCategoryInput } from './input/update-category.input';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private model: Model<CategoryModel>) {}

  async create(
    create_input: CreateCategoryInput,
  ): Promise<CategoryModel | ErrorHandlingMessage> {
    try {
      const model = new this.model(create_input);
      const data = await model.save();
      data.message = 'បានរក្សាទុក';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async findAll(
    options: InputCursorPaginationOption,
  ): Promise<CategoryCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(id: string): Promise<CategoryModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findById(id);
      data.message = 'បានស្វែងរក';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async update(
    id: string,
    update_input: UpdateCategoryInput,
  ): Promise<CategoryModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findByIdAndUpdate(
        id,
        { $set: update_input },
        { new: true },
      );
      data.message = 'បានកែប្រែ';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async remove(id: string): Promise<CategoryModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findById(id);
      await this.model.findByIdAndDelete(id);
      data.message = 'បានលុប';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async findByParent(_id: string): Promise<CategoryModel> {
    return this.model.findOne({_id})
  }
}
