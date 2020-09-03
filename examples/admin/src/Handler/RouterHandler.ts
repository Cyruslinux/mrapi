import express from 'express'
import Recover from './Recover'
import assert from 'assert'
import dal from '../dal'
export default [
    // 获取路由列表
    {
        method: 'GET',
        url: '/router/list',
        handler: Recover(async () => {
            assert(dal.server,'server is not running')
            assert(dal.server.app._router,'no routers')
            const routes = dal.server.app._router.stack
            const list = []
            for (const item of routes) {
                list.push({
                    name: item.name,
                    path: item.path,
                    regexp: item.regexp.toString(),
                })
            }
            return list
        }),
    },
    {
        method: 'get',
        url: '/router/add/:name',
        handler: Recover(async (req: express.Request) => {
            assert(dal.server,'start server first')
            assert(req.params.name,'params error')
            const name = req.params.name.split('.')[0]
            const routes = dal.server.app._router.stack
            let isOk = false
            for (const item of routes) {
                    if(item.regexp.test(`/graphql/${name}`)) {
                        isOk = true
                        break
                    }
            }
            if(isOk) { // 更新路由
                dal.removeSchema(name)
            }
            dal.addSchema(name)
            return 'ok'
        }),
    },
    {
        method: 'delete',
        url: '/router/remove',
        handler: Recover(async (req: express.Request) => {
            const routes = dal.server.app._router.stack
             let isOk = false; let re
            for (const item of routes) {
                console.log(item)
                if(item.regexp.toString() === req.query.name) {
                    re = item.regexp
                    isOk = true
                    break
                }
            }
            if(isOk) {
                // @ts-expect-error
               const ss = req.query.name.replace(new RegExp('\\\\','g'),'')
               const result = re.exec(ss.replace('/^',''))
               dal.removeSchema(result[0].split('/')[2])
            }
           return 'OK'
        }),
    },
]
