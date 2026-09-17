// test/alunos.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { App } from '../index.js'
import type { RegisterUserInput } from '../src/schemas/user.schema.js'
import { StatusCodes } from 'http-status-codes'

describe('Rotas de alunos', () => {
  const app = new App()


  beforeAll(async () => {
    await app.ready() 
  })

  afterAll(async () => {
    await app.close()
  })

  it("deve criar um usuário",async ()=>{
    const payloadUsuario:RegisterUserInput = {
      email: "emalmHHial@gmail.com",
      password: "senha1234",
      name: "usuario ficticio",
    }

    const response = await app.inject({
      method:"POST",
      url:"/user",
      payload: payloadUsuario
    })

    expect(response.statusCode).toBe(StatusCodes.CREATED)
  })


  it("deve listar os usuarios", async ()=>{
    const response = await app.inject({
      method: "GET",
      url: "/user"
    })

    
    
  
    expect(response.statusCode).toBe(StatusCodes.OK)
    if (response.statusCode !== StatusCodes.OK) 
        console.log(response.body);
  })


})