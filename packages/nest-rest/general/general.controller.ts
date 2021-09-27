import { BaseEntity } from "@entitify/common";
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { CreateGeneralDto } from "./dto/create-general.dto";
import { UpdateGeneralDto } from "./dto/update-general.dto";
import { GeneralService } from "./general.service";

@Controller()
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post()
  create(@Body() createGeneralDto: CreateGeneralDto<BaseEntity>) {
    return this.generalService.create(createGeneralDto.entity);
  }

  @Get("count")
  count(@Req() req: Request) {
    return this.generalService.count(req.url);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.generalService.findOne(+id);
  }

  @Get()
  findByCondition(@Req() req: Request) {
    return this.generalService.findByCondition(req.url);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGeneralDto: UpdateGeneralDto) {
    return this.generalService.update(+id, updateGeneralDto.entity);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.generalService.remove(+id);
  }
}
