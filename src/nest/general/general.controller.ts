import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

import { parseQuery } from "../../utils/query-string/parse-query";

import { GeneralService } from "./general.service";

/*export const getController = <
  TEntity extends EntitySchema<{
    id: number;
  }>,
  TCreateEntity,
  TUpdateEntity = Partial<TCreateEntity>
>(
  entityClass: TEntity,
  generalService: Service<TEntity, TCreateEntity, TUpdateEntity>
): ControllerType<TCreateEntity, TUpdateEntity> => {*/
@Controller("user")
export class GeneralController {
  constructor(private readonly generalService: GeneralService<any>) {}

  @Post()
  // create(@Body() createGeneralDto: TCreateEntity) {
  create(@Body() createGeneralDto: any) {
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
  // update(@Param("id") id: string, @Body() updateGeneralDto: TUpdateEntity) {
  update(@Param("id") id: string, @Body() updateGeneralDto: any) {
    return this.generalService.update(+id, updateGeneralDto.entity);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.generalService.remove(+id);
  }
}
/*
  return GeneralController as any;
};
*/
