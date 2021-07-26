import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

import { parseQuery } from "../../utils/query-string/parse-query";

import { CreateGeneralDto } from "./dto/create-general.dto";
import { UpdateGeneralDto } from "./dto/update-general.dto";
import { GeneralService } from "./general.service";

@Controller("user")
export class GeneralController {
  constructor(private readonly generalService: GeneralService<any>) {}

  @Post()
  create(@Body() createGeneralDto: CreateGeneralDto<any>) {
    return this.generalService.create(createGeneralDto.entity);
  }

  @Get("count")
  count() {
    return this.generalService.count();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.generalService.findOne(+id);
  }

  @Get()
  findByCondition(@Query() query: Record<string, string>) {
    return this.generalService.findByCondition(parseQuery(query));
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
