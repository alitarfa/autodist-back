import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  public _id: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
