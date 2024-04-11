import cors from 'cors'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import { connectToDB } from './dbUtils'
import { Inventory } from './models/inventory'
import { inventoryRouter } from './api/inventory/inventoryRoute'

// import { Workspace } from 'types'

const app = express()
const PORT = 8000

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended : false })

app.use(urlencodedParser)
app.use(jsonParser)
app.use(cors())

// Routes
app.use('/inventory', inventoryRouter)

connectToDB()

// app.get('/workspaces', (_, response: Response) => {
//   try {
//     const data = {
//       metalType: 'gold',
//       unit: 'g',
//       weight: 32,
//       itemName: 'pure',
//       purity: 100
//     }
//
//     Inventory.create(data)
//   } catch(error: unknown) {
//     if (error instanceof Error) {
//       console.log('Error!')
//       console.log(error.message)
//     }
//   }
//
//   const workspaces = [
//     { name: 'api', version: '1.0.0' },
//     { name: 'types', version: '1.0.0' },
//     { name: 'web', version: '1.0.0' },
//   ]
//   response.json({ data: workspaces })
// })

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
