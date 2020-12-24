import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {PurchaseModel} from "./models/purchase.model";
import {CreatePurchaseInput} from './input/create-purchase.input';
import {PurchaseCursorPagination} from './dto/purchase.dto';
import {UpdatePurchaseInput} from './input/update-purchase.input';

@Injectable()
export class PurchaseService {
    constructor(@InjectModel('Purchase') private model: Model<PurchaseModel>) {
    }

    async create(
        create_input: CreatePurchaseInput,
    ): Promise<PurchaseModel | ErrorHandlingMessage> {
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
    ): Promise<PurchaseCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<PurchaseModel | ErrorHandlingMessage> {
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
        update_input: UpdatePurchaseInput,
    ): Promise<PurchaseModel | ErrorHandlingMessage> {
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

    async remove(id: string): Promise<PurchaseModel | ErrorHandlingMessage> {
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

    async findByParent(_id: string): Promise<PurchaseModel> {
        return this.model.findOne({_id})
    }
}
