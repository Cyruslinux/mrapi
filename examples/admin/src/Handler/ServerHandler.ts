import Recover from './Recover'
import dal from '../dal'
import assert from 'assert'
import { GetPrismaClientName,CheckProcess ,CheckTenantManagement }from '../Service/CommonService'
export default[
    {
        method: 'GET',
        url: '/server/start',
        handler: Recover(async () => {
           if(!dal.server) {
              dal.start()
             const arr = await GetPrismaClientName()
             for(const item of arr) {
                 dal.addSchema(item)
             }
           }else{
               // @ts-expect-error
             const checkRes = await CheckProcess(dal.server.options.port)
             assert(!dal.server.serverRunningStatus && !checkRes,'server is running')

             dal.start()
          }
            return 'OK'
        }),
    },
    {
        method: 'GET',
        url: '/server/stop',
        handler: Recover(async () => {
            assert(dal.server,'server is not exist')
            assert(dal.server.serverRunningStatus,'server is stoped')
            dal.server.stop()
            return 'OK'
        }),
    },
    {
        method: 'GET',
        url: '/server/info',
        handler: Recover(async () => {
             assert(await CheckTenantManagement(),'please init tenant')
             assert(dal.server,'server is not exist，please start server')
            // @ts-expect-error
            return { ...dal.server.options,serverStatus: dal.server.serverRunningStatus,tenantStatus: await CheckTenantManagement() }
        }),
    },
]
