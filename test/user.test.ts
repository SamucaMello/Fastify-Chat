// test/alunos.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { App } from '../index.js'
import type { RegisterUserInput, SafeUser } from '../src/schemas/user.schema.js'
import { StatusCodes } from 'http-status-codes'



let usuarioCriado:SafeUser;


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
      email: `usuario_ficticio1q111@gmail.com`,
      password: "senha1234",
      name: "usuario ficticio",
    }

    const response = await app.inject({
      method:"POST",
      url:"/user",
      payload: payloadUsuario
    })


    expect(response.statusCode).toBe(StatusCodes.CREATED)
    usuarioCriado = response.json().user
  })



  it("deve listar os usuarios", async ()=>{
    const response = await app.inject({
      method: "GET",
      url: "/user"
    })
    expect(response.statusCode).toBe(StatusCodes.OK)
  })




  it("deve atualizar um usuario", async ()=>{
    const response = await app.inject({
      method: "PUT",
      url: `/user/${usuarioCriado.id}`,
      body: {email: "email_atualizado11q3211@gmail.com"}
    })
    expect(response.statusCode).toBe(StatusCodes.OK)
  })


  it("deve apagar um usuario", async () => {
    const response = await app.inject({
      method:"DELETE",
      url: `/user/${usuarioCriado.id}`,
    })

    expect(response.statusCode).toBe(StatusCodes.OK)
  })

})