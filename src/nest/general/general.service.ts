import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';

@Injectable()
export class GeneralService {
  create(createGeneralDto: CreateGeneralDto) {
    return 'This action adds a new general';
  }

  findAll() {
    return `This action returns all general`;
  }

  findOne(id: number) {
    return `This action returns a #${id} general`;
  }

  update(id: number, updateGeneralDto: UpdateGeneralDto) {
    return `This action updates a #${id} general`;
  }

  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
