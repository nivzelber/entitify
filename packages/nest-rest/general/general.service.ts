import { BaseEntity, defaultOptions, Options } from "@entitify/common";
import {
  FieldNameTypeTuple,
  getConditionedQueryOptions,
  getFields,
  getQueryStringFromURL
} from "@entitify/core";
import { Inject, Injectable, Optional } from "@nestjs/common";
import { EntitySchema, getConnection, Repository } from "typeorm";

import { Tokens } from "./constants";
import { CreateGeneralDto } from "./dto/create-general.dto";
import { UpdateGeneralDto } from "./dto/update-general.dto";

@Injectable()
export class GeneralService {
  entityClass: EntitySchema<BaseEntity>;
  options: Options;

  repositoryInitialized: boolean;
  repository: Repository<BaseEntity>;
  name: string;
  fields: FieldNameTypeTuple[];

  constructor(
    @Inject(Tokens.EntityClass) entityClass: EntitySchema<BaseEntity>,
    @Optional() @Inject(Tokens.Options) options: Options = {}
  ) {
    this.repositoryInitialized = false;
    this.entityClass = entityClass;
    this.options = { ...defaultOptions, ...options };
  }

  initRepository() {
    if (!this.repositoryInitialized) {
      this.repositoryInitialized = true;
      const connection = getConnection();
      this.repository = connection.getRepository(this.entityClass);
      const { name, ownColumns } = connection.getMetadata(this.entityClass);
      this.name = name;
      this.fields = getFields(ownColumns);
    }
  }

  async count(url: string) {
    this.initRepository();
    try {
      const queryString = getQueryStringFromURL(url);
      const queryOptions = getConditionedQueryOptions({
        queryString,
        options: this.options,
        fields: this.fields
      });
      const count = await this.repository.count(queryOptions);
      return { count };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    this.initRepository();
    try {
      const entity = await this.repository.findOneOrFail(id);
      return { entity };
    } catch (err) {
      const error = new Error(`No ${this.name} found with id: ${id}`);
      error.stack = (err as Error).stack + "/n" + error.stack;
      throw error;
    }
  }

  async findByCondition(url: string) {
    this.initRepository();
    try {
      const queryString = getQueryStringFromURL(url);
      const queryOptions = getConditionedQueryOptions({
        queryString,
        options: this.options,
        fields: this.fields
      });

      const [entities, total] = await this.repository.findAndCount(queryOptions);
      return { entities, total };
    } catch (error) {
      throw error;
    }
  }

  async create(entity: CreateGeneralDto<BaseEntity>["entity"]) {
    this.initRepository();
    try {
      const createdEntity = this.repository.create(entity);
      const entityFromDB = await this.repository.save(createdEntity);
      return { entity: entityFromDB };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, partialEntity: UpdateGeneralDto["entity"]) {
    this.initRepository();
    try {
      let entity = await this.repository.findOneOrFail(id);
      entity = {
        ...entity,
        ...partialEntity
      };
      const entityFromDB = await this.repository.save(entity);
      return { entity: entityFromDB };
    } catch (err) {
      const error = new Error(`No ${this.name} found with id: ${id}`);
      error.stack = (err as Error).stack + "/n" + error.stack;
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
      error.stack = (err as Error).stack + "/n" + error.stack;
      throw error;
    }
  }
}
