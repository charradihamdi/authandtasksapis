import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Task extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
