import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import { SubCategoryModel } from './models/sub-category.model';
import { CreateSubCategoryInput } from './input/create-sub-category.input';
import { SubCategoryCursorPagination } from './dto/sub-category.dto';
import { UpdateSubCategoryInput } from './input/update-sub-category.input';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel('SubCategory') private model: Model<SubCategoryModel>,
  ) {}

  async create(
    create_input: CreateSubCategoryInput,
  ): Promise<SubCategoryModel | ErrorHandlingMessage> {
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
  ): Promise<SubCategoryCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(id: string): Promise<SubCategoryModel | ErrorHandlingMessage> {
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
    update_input: UpdateSubCategoryInput,
  ): Promise<SubCategoryModel | ErrorHandlingMessage> {
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

  async remove(id: string): Promise<SubCategoryModel | ErrorHandlingMessage> {
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

  async findByParent(_id: string): Promise<SubCategoryModel> {
    return this.model.findOne({_id})
  }
}
