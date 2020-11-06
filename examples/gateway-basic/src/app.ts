import { App } from '@mrapi/app'
import { Gateway } from '@mrapi/gateway'

const service = new App()

service
  .get('/', (_req, res) => {
    res.end('Hello World!')
  })
  .get('/user', (_req, res) => {
    res.end('Hello User!')
  })
  .listen(3000, (err: any) => {
    if (err) {
      throw err
    }

    console.log(
      `Service listening at http://localhost:${
        (service.server?.address() as any)?.port
      }`,
    )
  })

const gateway = new Gateway({
  app: {},
  services: [
    {
      name: 'service',
      url: 'http://0.0.0.0:3000',
    },
  ],
})

gateway.start().catch((err) => gateway.logger.error(err))
