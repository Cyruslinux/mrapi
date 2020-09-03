import express from 'express'
import Recover from './Recover'
import assert from 'assert'
import * as fs from 'fs'
import { spawnShell } from '@mrapi/common'
export default [
    {
        method: 'GET',
        url: '/config/info',
        handler: Recover(async (_req: express.Request) => {
            const config = require('../../config/mrapi.config.js')
            return config
        }),
    },
    {
        method: 'POST',
        url: '/config/init',
        handler: Recover(async (req: express.Request) => {
            assert(req.body.managementUrl,'[managementUrl] cannot be null')
            const config = require('../../config/mrapi.config.js')
            config.defualt.managementUrl = req.body.managementUrl
            const str = JSON.stringify(config.defualt)
            process.env.PMP_MANAGEMENT_URL = 'file:../config/db/management.db'
            await fs.writeFileSync('config/mrapi.config.js', `exports.defualt = ${str}`, 'utf-8')
            try {
                const ress = await spawnShell('npx mrapi generate --name management')
                assert(ress === 0,'generate management failed')
            } catch (error) {
                assert(false,error)
            }
            return 'ok'
        }),
    },
]
