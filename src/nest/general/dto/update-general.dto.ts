import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralDto } from './create-general.dto';

export class UpdateGeneralDto extends PartialType(CreateGeneralDto) {}
