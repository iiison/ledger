import cors from 'cors'
import express, { Request, Response } from 'express'

// import { Workspace } from 'types'

const app = express()
const port = 8000

app.use(cors())

app.get('/workspaces', (_, response: Response) => {
  const workspaces = [
    { name: 'api', version: '1.0.0' },
    { name: 'types', version: '1.0.0' },
    { name: 'web', version: '1.0.0' },
  ]
  response.json({ data: workspaces })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
