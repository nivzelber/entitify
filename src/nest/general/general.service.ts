import { Inject, Injectable } from "@nestjs/common";
import { ParsedQs } from "qs";
import { EntitySchema, getConnection, Repository } from "typeorm";

import { User } from "../../../examples/user.model";
import { defaultOptions } from "../../common/options";
import { getWhereConditions } from "../../utils/conditions";
import { FieldNameTypeTuple, getFields } from "../../utils/decode-entity/get-fields-by-type";

@Injectable()
export class GeneralService<
  TEntity extends EntitySchema<BaseEntity>
> /*implements Service<TEntity, TCreateEntity, TUpdateEntity> */ {
  entityClass: EntitySchema<BaseEntity>;
  name: string;
  fields: FieldNameTypeTuple[];
  repository: Repository<TEntity>;
  constructor(
    @Inject("entityClass") entityClass: EntitySchema<BaseEntity>
    // @InjectRepository(User) private asd: Repository<User>
  ) {
    this.entityClass = entityClass;
  }

  initRepository() {
    if (!this.repository) {
      this.repository = getConnection().getRepository(User) as any;
      const { name, ownColumns } = getConnection().getMetadata(this.entityClass);
      this.name = name;
      this.fields = getFields(ownColumns);
    }
  }

  async count() {
    this.initRepository();
    try {
      const count = await this.repository.count({});
      return count;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    this.initRepository();
    try {
      const entity = await this.repository.findOneOrFail(id);
      return entity;
    } catch (err) {
      const error = new Error(`No ${this.name} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  }

  async findByCondition(query: ParsedQs) {
    this.initRepository();
    const {
      take = defaultOptions.take,
      skip = 0,
      paginate = true,
      _and = false,
      _sort_by = "id",
      _sort_direction = "ASC"
    } = query;

    const conditions: any = {
      where: getWhereConditions({
        query,
        fields: this.fields,
        and: _and as boolean
      }),
      order: { [_sort_by as string]: (_sort_direction as string).toUpperCase() }
    };

    if (paginate) {
      conditions.take = take;
      conditions.skip = skip;
    }

    const [entities, total] = await this.repository.findAndCount(conditions);
    return { entities, total };
  }

  // async create(entity: TCreateEntity) {
  async create(entity: any) {
    this.initRepository();
    try {
      const createdEntity = this.repository.create(entity);
      const entityFromDB = await this.repository.save(createdEntity as any);
      return entityFromDB;
    } catch (error) {
      throw error;
    }
  }

  // async update(id: number, partialEntity: TUpdateEntity) {
  async update(id: number, partialEntity: any) {
    this.initRepository();
    try {
      let entity = await this.repository.findOneOrFail(id);
      entity = {
        ...entity,
        ...partialEntity
      };
      const entityFromDB = await this.repository.save(entity as any);
      return entityFromDB;
    } catch (err) {
      const error = new Error(`No ${this.name} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  }

  async remove(id: number) {
    this.initRepository();
    try {
      await this.repository.delete(id);
      return true;
    } catch (err) {
      const error = new Error(`No ${this.name} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  }
}

/*
  return GeneralService as any;
};*/
