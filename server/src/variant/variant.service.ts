import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {VariantModel} from './models/variant.model';
import {CreateVariantInput} from './input/create-variant.input';
import {VariantCursorPagination} from './dto/variant.dto';
import {UpdateVariantInput} from './input/update-variant.input';

@Injectable()
export class VariantService {
    constructor(@InjectModel('Variant') private model: Model<VariantModel>) {
    }

    async create(
        create_input: CreateVariantInput
    ): Promise<VariantModel | ErrorHandlingMessage> {
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
    ): Promise<VariantCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<VariantModel | ErrorHandlingMessage> {
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
        update_input: UpdateVariantInput,
    ): Promise<VariantModel | ErrorHandlingMessage> {
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

    async remove(id: string): Promise<VariantModel | ErrorHandlingMessage> {
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

    async findByProduct(product_id: string): Promise<VariantModel[]> {
        return this.model.find({product_id})
    }
}
