import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import { BrandModel } from './models/brand.model';
import { BrandCursorPagination } from './dto/brand.dto';
import { UpdateBrandInput } from './input/update-brand.input';
import { CreateBrandInput } from './input/create-brand.input';

@Injectable()
export class BrandService {
  constructor(@InjectModel('Brand') private model: Model<BrandModel>) {}

  async create(
    create_input: CreateBrandInput,
  ): Promise<BrandModel | ErrorHandlingMessage> {
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
  ): Promise<BrandCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(id: string): Promise<BrandModel | ErrorHandlingMessage> {
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
    update_input: UpdateBrandInput,
  ): Promise<BrandModel | ErrorHandlingMessage> {
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

  async remove(id: string): Promise<BrandModel | ErrorHandlingMessage> {
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

  async findByParent(_id: string): Promise<BrandModel> {
    return this.model.findOne({_id})
  }
}
