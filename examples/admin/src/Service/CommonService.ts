
import * as fs from 'fs'
import { runShell } from '@mrapi/common'
export const GetPrismaClientName = async function() {
    let files: string[] = []
    try{
     files = await fs.readdirSync('node_modules/.prisma-mrapi')
    }catch(err) {

    }
    return files
}

export const CheckProcess = async function(port:number) {
    try{
      await runShell(`lsof -i  tcp:${port}`)
     return true
    }catch(err) {
      console.log('err',err)
      return false
    }
}

export const CheckTenantManagement = async function() {
     try{
       require('.prisma-multi-tenant/management')
       return true
     }catch(err) {
       return false
     }
}
