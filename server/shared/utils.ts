import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
export class ErrorHandlingType {
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
  @Field({ nullable: true })
  success: boolean;
  @Field({ nullable: true })
  message: string;
}

export interface ErrorHandlingMessage {
  success: boolean;
  message: string;
}

export class ErrorHandlingEntity extends Document {
  success: boolean;
  message: string;
}
