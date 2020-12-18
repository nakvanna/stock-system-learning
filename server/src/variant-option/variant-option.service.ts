import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import { VariantOptionModel } from './models/variant-option.model';
import { CreateVariantOptionInput } from './input/create-variant-option.input';
import { VariantOptionCursorPagination } from './dto/variant-option.dto';
import { UpdateVariantOptionInput } from './input/update-variant-option.input';

@Injectable()
export class VariantOptionService {
  constructor(
    @InjectModel('VariantOption') private model: Model<VariantOptionModel>,
  ) {}

  async create(
    create_input: CreateVariantOptionInput,
  ): Promise<VariantOptionModel | ErrorHandlingMessage> {
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
  ): Promise<VariantOptionCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(
    id: string,
  ): Promise<VariantOptionModel | ErrorHandlingMessage> {
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
    update_input: UpdateVariantOptionInput,
  ): Promise<VariantOptionModel | ErrorHandlingMessage> {
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

  async remove(id: string): Promise<VariantOptionModel | ErrorHandlingMessage> {
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

  async findByVariant(variant_id: string): Promise<VariantOptionModel[]>{
    return this.model.find({variant_id})
  }
}
