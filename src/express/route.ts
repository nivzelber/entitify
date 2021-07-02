import { Router } from "express";
import qs from "qs";
import { EntityTarget, getConnection, getRepository } from "typeorm";

import { getGeneralConditions } from "../utils/conditions/generalFields";
import { getNumbersConditions } from "../utils/conditions/numberFields";
import { getStringsConditions } from "../utils/conditions/stringFields";
import { getFieldsByType } from "../utils/decode-entity/get-fields-by-type";
import { queryStringValueDecoder } from "../utils/query-string-value-decoder";

export interface Options {
  take?: number;
}

const defaultOptions: Options = { take: 50 };

export const route = <TEntity extends EntityTarget<{ id: number }>>(
  entityClass: TEntity,
  options: Options = defaultOptions
) => {
  options = { ...defaultOptions, ...options };

  const { name: entityName, ownColumns } = getConnection().getMetadata(entityClass);
  const repository = getRepository(entityClass);

  const stringFields = getFieldsByType(ownColumns, "String");
  const numberFields = getFieldsByType(ownColumns, "Number");

  const router = Router();

  router.get("/count", async (_req, res) => {
    try {
      const count = await repository.count({});
      res.status(200).json({ count });
    } catch (error) {
      throw error;
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const entity = await repository.findOneOrFail(id);
      res.status(200).json(entity);
    } catch (err) {
      const error = new Error(`No ${entityName} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  });

  router.get("/", async (req, res) => {
    try {
      //#region query string
      const queryStringIndex = req.url.indexOf("?");
      const requestHasQueryString = queryStringIndex !== -1;
      const rawQueryString = req.url.slice(requestHasQueryString ? queryStringIndex + 1 : 0);

      const queryString = qs.parse(rawQueryString, {
        decoder: queryStringValueDecoder
      });

      const { take = options.take, skip = 0, paginate = true, _and = false } = queryString;
      //#endregion query string

      //#region find conditions
      const conditions: any = {
        where: [],
        order: { id: "ASC" }
      };

      const allFields = ([] as string[]).concat(stringFields).concat(numberFields);
      const generalConditions = getGeneralConditions(allFields, req.query);
      conditions.where.push(...generalConditions); // using concat does not work here

      const stringConditions = getStringsConditions(stringFields, req.query);
      conditions.where.push(...stringConditions);

      const numberConditions = getNumbersConditions(numberFields, req.query);
      conditions.where.push(...numberConditions);

      // joining conditions in case "_and" was supplied
      if (_and && conditions.where.length > 0) {
        const andConditions: object[] = [conditions.where[0]];
        for (let i = 1; i < conditions.where.length; i++) {
          const currentCondition = conditions.where[i];
          const fieldName = Object.keys(currentCondition)[0];
          if (andConditions[0].hasOwnProperty(fieldName)) {
            andConditions.push(currentCondition);
          } else {
            andConditions[0][fieldName] = currentCondition[fieldName];
          }
        }

        conditions.where = andConditions;
      }
      //#endregion find conditions

      if (paginate) {
        conditions.take = take;
        conditions.skip = skip;
      }

      const [entities, total] = await repository.findAndCount(conditions);
      res.status(200).json({ entities, total });
    } catch (error) {
      throw error;
    }
  });

  router.post("/", async (req, res) => {
    try {
      const entity = repository.create(req.body.entity);
      const entityFromDB = await repository.save(entity);
      res.status(200).json({ entity: entityFromDB });
    } catch (error) {
      throw error;
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let entity = await repository.findOneOrFail(id);
      entity = {
        ...entity,
        ...req.body.entity
      };
      const entityFromDB = await repository.save(entity);
      res.status(200).json({ entity: entityFromDB });
    } catch (err) {
      const error = new Error(`No ${entityName} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await repository.delete(id);
      res.sendStatus(200);
    } catch (err) {
      const error = new Error(`No ${entityName} found with id: ${id}`);
      error.stack = err.stack + "/n" + error.stack;
      throw error;
    }
  });

  return router;
};
