import { BaseEntity, defaultOptions, Options } from "@entitify/common";
import { getConditionedQueryOptions, getFields, getQueryOptions } from "@entitify/core";
import { Request, Router } from "express";
import { EntityTarget, getConnection, getRepository } from "typeorm";

import { getQueryString } from "./get-query-string";
import { EmptyObject } from "./types/empty-object.type";

export const route = <
  TEntity extends EntityTarget<BaseEntity>,
  TCreateEntity = Omit<TEntity, "id">,
  TUpdateEntity = Partial<TCreateEntity>
>(
  entityClass: TEntity,
  options: Options = {}
): Router => {
  options = { ...defaultOptions, ...options };

  const { name: entityName, ownColumns } = getConnection().getMetadata(entityClass);
  const fields = getFields(ownColumns);

  const router = Router();
  const repository = getRepository(entityClass);

  router.get("/count", async (req, res) => {
    try {
      const queryString = getQueryString(req.url);
      const queryOptions = getConditionedQueryOptions({ queryString, options, fields });
      const count = await repository.count(queryOptions);
      res.status(200).json({ count });
    } catch (error) {
      throw error;
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const queryOptions = getQueryOptions<"one">({ options });
    try {
      const entity = await repository.findOneOrFail(id, queryOptions);
      res.status(200).json({ entity });
    } catch (err) {
      const error = new Error(`No ${entityName} found with id: ${id}`);
      error.stack = (err as Error).stack + "/n" + error.stack;
      throw error;
    }
  });

  router.get("/", async (req, res) => {
    try {
      const queryString = getQueryString(req.url);
      const queryOptions = getConditionedQueryOptions({ queryString, options, fields });

      const [entities, total] = await repository.findAndCount(queryOptions);
      res.status(200).json({ entities, total });
    } catch (error) {
      throw error;
    }
  });

  router.post(
    "/",
    async (req: Request<EmptyObject, { entity: BaseEntity }, { entity: TCreateEntity }>, res) => {
      try {
        const entity = repository.create(req.body.entity);
        const entityFromDB = await repository.save(entity);
        res.status(200).json({ entity: entityFromDB });
      } catch (error) {
        throw error;
      }
    }
  );

  router.patch(
    "/:id",
    async (
      req: Request<{ id: number }, { entity: BaseEntity }, { entity: TUpdateEntity }>,
      res
    ) => {
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
        error.stack = (err as Error).stack + "/n" + error.stack;
        throw error;
      }
    }
  );

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await repository.delete(id);
      res.sendStatus(200);
    } catch (err) {
      const error = new Error(`No ${entityName} found with id: ${id}`);
      error.stack = (err as Error).stack + "/n" + error.stack;
      throw error;
    }
  });

  return router;
};
