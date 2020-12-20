import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {ProductModel} from './models/product.model';
import {CreateProductInput} from './input/create-product.input';
import {ProductCursorPagination} from "./dto/product.dto";
import {UpdateProductInput} from './input/update-product.input';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private model: Model<ProductModel>) {
    }

    async create(
        create_input: CreateProductInput,
    ): Promise<ProductModel | ErrorHandlingMessage> {
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
    ): Promise<ProductCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<ProductModel | ErrorHandlingMessage> {
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
        update_input: UpdateProductInput,
    ): Promise<ProductModel | ErrorHandlingMessage> {
        try {
            const data = await this.model.findByIdAndUpdate(
                id,
                {$set: update_input},
                {new: true},
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

    async remove(id: string): Promise<ProductModel | ErrorHandlingMessage> {
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

    async findBySku(_id: string): Promise<ProductModel> {
        return this.model.findOne({_id})
    }
}
