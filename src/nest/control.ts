





// export const control = <
//   TEntity extends EntitySchema<{
//     id: number;
//   }>,
//   TCreateEntity = Omit<TEntity, "id">,
//   TUpdateEntity = Partial<TCreateEntity>
// >(
//   entityClass: TEntity,
//   generalService: Service<TEntity, TCreateEntity, TUpdateEntity>
// ): Controller<TCreateEntity, TUpdateEntity> => {
//   console.log("control");
//   console.log(generalService.findOne);

//   // const { name: entityName } = getConnection().getMetadata(entityClass);

//   // const service = getService<TCreateEntity, TUpdateEntity>(repository, entityName, options, fields);
//   const controller = getController<TEntity, TCreateEntity, TUpdateEntity>(
//     entityClass /*entityName*/,
//     new (generalService as any)()
//   );

//   // @Module({
//   //   controllers: [controller as any],
//   //   providers: [service as any]
//   // })
//   // class module implements ModuleType {}

//   return controller;
// };
// export const serve = <
//   TEntity extends EntitySchema<{
//     id: number;
//   }>,
//   TCreateEntity = Omit<TEntity, "id">,
//   TUpdateEntity = Partial<TCreateEntity>
// >(
//   entityClass: TEntity,
//   options: Options = defaultOptions
// ): Service<TEntity, TCreateEntity, TUpdateEntity> => {
//   console.log("serve");
//   options = { ...defaultOptions, ...options };

//   // const { name: entityName, ownColumns } = getConnection().getMetadata(entityClass);
//   // const fields = getFields(ownColumns);

//   // const repository = getRepository(entityClass);

//   const service = getService<TEntity, TCreateEntity, TUpdateEntity>(
//     entityClass,
//     /* entityName,*/ options /*fields*/
//   );
//   // const controller = getController<TCreateEntity, TUpdateEntity>(entityName);

//   // @Module({
//   //   controllers: [controller as any],
//   //   providers: [service as any]
//   // })
//   // class module implements ModuleType {}

//   return service;
// };
