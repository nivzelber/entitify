import { PartialType } from "@nestjs/mapped-types";

import { BaseEntity } from "../../../utils/types/base-entity.type";

import { CreateGeneralDto } from "./create-general.dto";

export class UpdateGeneralDto extends PartialType<CreateGeneralDto<BaseEntity>>(CreateGeneralDto) {}
