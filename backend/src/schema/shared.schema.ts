import Z from "zod";
import { SortOrder } from "../types/enums";

export const sharedSchemaConfig = {
    pagination: {
        page: {
            default: 1,
        },
        limit: {
            default: 10,
            min: 1,
            max: 500,
        },
    },
    sortProps: {
        sortBy: {
            default: "createdAt",
        },
        order: {
            default: SortOrder.ASC
        },
    }
}


export const paginationSchema = Z.object({
    page: Z.number().default(sharedSchemaConfig.pagination.page.default).optional(),
    limit: Z.number().min(sharedSchemaConfig.pagination.limit.min).max(sharedSchemaConfig.pagination.limit.max).default(sharedSchemaConfig.pagination.limit.default).optional(),
});
export type Pagination = Z.infer<typeof paginationSchema>;


export const sortSchema = Z.object({
    sortBy: Z.string().default(sharedSchemaConfig.sortProps.sortBy.default).optional(),
    order: Z.nativeEnum(SortOrder).default(sharedSchemaConfig.sortProps.order.default).optional(),
});
export type SortProps = Z.infer<typeof sortSchema>;

export const listSchema = Z.object({
    pagination: paginationSchema,
    sortProps: sortSchema,
});

export type ListSchema = Z.infer<typeof listSchema>;


export const filterSchema = Z.object({
    createdAt: Z.object({
        from: Z.date().optional(),
        to: Z.date().optional(),
    }).optional(),
    updatedAt: Z.object({
        from: Z.date().optional(),
        to: Z.date().optional(),
    }).optional(),
});


// filter schema that contain attributes that can be used to filter the list of objects
export const getManySchema = <T extends Z.ZodObject<any, any>>(filterSchema?: T) => Z.object({
    body: Z.object({
        pagination: paginationSchema,
        sortProps: sortSchema,
        filter: filterSchema ? filterSchema.optional() : Z.object({}).optional(),
    }).optional()
});

export const getManyWithFilterSchema = getManySchema(filterSchema);

export type GetManySchema = Z.infer<typeof getManyWithFilterSchema>;


export const getOneSchema = <T extends Z.ZodObject<any, any>>(filterSchema?: T) => Z.object({
    body: Z.object({
        filter: filterSchema ? filterSchema.optional() : Z.object({}).optional(),
    }).optional()
});


const getOneWithFilterSchema = getOneSchema(filterSchema);

export type GetOneSchema = Z.infer<typeof getOneWithFilterSchema>;

export const paramsSchema = Z.object({
    id: Z.string().nonempty(),
});

export type ParamsSchema = Z.infer<typeof paramsSchema>;


export const getOneByIdSchema = <T extends Z.ZodObject<any, any>>(filterSchema: T) => Z.object({
    params: paramsSchema,
    ...getOneSchema(filterSchema).shape,
});

const getOneByIdWithFilterSchema = getOneByIdSchema(filterSchema);

export type GetOneByIdSchema = Z.infer<typeof getOneByIdWithFilterSchema>;


export const getOneOrCreateSchema = <T extends Z.ZodObject<any, any>>(filterSchema: T, dataSchema: T) => Z.object({
    body: Z.object({
        filter: filterSchema,
        input: dataSchema,
    }).optional()
});

export const getOneOrCreateWithFilterSchema = getOneOrCreateSchema(filterSchema, filterSchema);

export type GetOneOrCreateSchema = Z.infer<typeof getOneOrCreateWithFilterSchema>;

export const deleteOneByIdSchema = Z.object({
    params: paramsSchema,
});

export type DeleteOneByIdSchema = Z.infer<typeof deleteOneByIdSchema>;


export const createOneSchema = <T extends Z.ZodObject<any, any>>(createSchema: T) => Z.object({
    body: createSchema,
});

export const createOneWithFilterSchema = createOneSchema(filterSchema);
export type CreateOneSchema = Z.infer<typeof createOneWithFilterSchema>;


export const updateOneByIdSchema = <T extends Z.ZodObject<any, any>>(updateSchema: T) => Z.object({
    params: paramsSchema,
    body: updateSchema,
});

export const updateOneWithFilterByIdSchema = updateOneByIdSchema(filterSchema);

export type UpdateOneByIdSchema = Z.infer<typeof updateOneWithFilterByIdSchema>;



export const mongoObjectIdSchema = Z.string().regex(/^[0-9a-fA-F]{24}$/);