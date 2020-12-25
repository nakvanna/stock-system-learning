import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {SkuGalleryModel} from "./models/sku-gallery.model";
import {UpdateSkuGalleryInput} from './input/update-sku-gallery.input';
import {SkuGalleryCursorPagination} from './dto/sku-gallery.dto';
import {CreateSkuGalleryInput} from './input/create-sku-gallery.input';

@Injectable()
export class SkuGalleryService {
    constructor(@InjectModel('SkuGallery') private model: Model<SkuGalleryModel>) {
    }

    async create(
        create_input: CreateSkuGalleryInput,
    ): Promise<SkuGalleryModel | ErrorHandlingMessage> {
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
    ): Promise<SkuGalleryCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<SkuGalleryModel | ErrorHandlingMessage> {
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
        update_input: UpdateSkuGalleryInput,
    ): Promise<SkuGalleryModel | ErrorHandlingMessage> {
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

    async remove(id: string): Promise<SkuGalleryModel | ErrorHandlingMessage> {
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

    async findBySku(sku_id: string): Promise<SkuGalleryModel[]> {
        return this.model.find({sku_id})
    }
}
