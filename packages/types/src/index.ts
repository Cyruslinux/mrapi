import type { IncomingMessage, ServerResponse } from 'http'

// types for mrapi config
declare namespace mrapi {
  type PathObject = {
    input?: string
    output?: string
  }

  type ManagementObject = {
    enable?: boolean
    database?: string
    schema?: string
    prismaClient?: string
  }

  type Modify<T, R> = Omit<T, keyof R> & R
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

  type SuperMerge<T, U> = {
    [K in keyof (T & U)]: K extends keyof T
      ? T[K]
      : K extends keyof U
      ? U[K]
      : never
  }

  namespace dal {
    interface Options {
      paths?: PathObject
      server?: ServerOptions
      services?: ServiceOptions[]
      management?: ManagementObject
      pmtErrorThrow?: boolean
    }

    interface ServiceOptions {
      name: string
      schema?: string
      graphql?: GraphqlOptions
      openapi?: OpenapiOptions
      tenants: {
        [key: string]: string
      }
      defaultTenant?: string
      tenantOptions?: any
      paths?: PathObject & {
        nexus?: string
        prismaClient?: string
        managementClient?: string
      }
      management?: ManagementObject
    }

    interface ServerOptions {
      host?: string
      port?: number
      tenantIdentity?: string | TenantIdenityFn
      enableRouteRepeat?: boolean
      endpoint?: {
        graphql?: string
        openapi?: string
      }
      // middlewares
      middlewares?: {
        fn: Function
        options?: any
        wrap?: boolean
      }[]
    }

    interface GraphqlOptions {
      enable?: boolean
    }

    interface OpenapiOptions {
      enable?: boolean
      dependencies?: {
        [name: string]: Function | Promise<Function>
      }
      oasDir?: string
      validateApiDoc?: boolean
    }

    type Request = IncomingMessage
    type Response = ServerResponse & { json?: (data: unknown) => void }
    type TenantIdenityFn = (
      req: Request,
      res?: Response,
      params?: any,
    ) => string | Promise<string>
    type DatabaseType = 'sqlite' | 'mysql' | 'postgresql'
  }

  namespace api {
    interface Options {
      server: ServerOptions
      openapi?: OpenapiOptions
      graphql?: GraphqlOptions
      autoGenerate?: boolean
      tenantIdentity?: string
      schemaIdentity?: string
      schemaNames?: string[]
    }

    interface ServerOptions {
      type?: 'standalone' | 'combined'
      host?: string
      port?: number
      endpoint?: {
        graphql?: string
        openapi?: string
      }
      options?: {
        [key: string]: any
      }
      // plugins for fastify
      plugins?: {
        [key: string]: {}
      }
    }

    interface GraphqlOptions {
      dir?: string
      path?: string
      playground?: string | boolean
    }

    interface OpenapiOptions {
      dir?: string
      prefix?: string
      dalBaseUrl?: string
    }
  }

  namespace cli {
    interface Options {
      paths?: PathObject & {
        env?: string
      }
    }
  }

  namespace generate {
    type Query = 'findOne' | 'findMany' | 'findCount' | 'aggregate'

    type Mutation =
      | 'createOne'
      | 'updateOne'
      | 'upsertOne'
      | 'deleteOne'
      | 'updateMany'
      | 'deleteMany'

    type QueriesAndMutations = Query | Mutation

    interface Options {
      models?: string[]
      schema: string
      output: string
      excludeFields: string[]
      excludeModels: Array<{
        name: string
        queries?: boolean
        mutations?: boolean
      }>
      disableQueries?: boolean
      disableMutations?: boolean
      excludeFieldsByModel: { [modelName: string]: string[] }
      onDelete?: boolean
      nexusSchema?: boolean
      excludeQueriesAndMutationsByModel: {
        [modelName: string]: QueriesAndMutations[]
      }
      excludeQueriesAndMutations: QueriesAndMutations[]
      javascript?: boolean
    }
  }

  interface Config {
    dal?: dal.Options
    api?: api.Options
    cli?: cli.Options
    generate?: generate.Options
  }
}

export = mrapi