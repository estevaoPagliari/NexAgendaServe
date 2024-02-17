import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function tiposervicoRoutes(app: FastifyInstance) {
  app.get('/tiposervico', async (request, reply) => {
    try {
      const users = await prisma.tiposServico.findMany({})
      return reply.code(200).send(users)
    } catch (error) {
      console.error('Erro ao buscar Servico:', error)
      return reply.code(500).send({ message: 'Erro ao buscar Servico.' })
    }
  })

  app.get('/tiposervico/:idservico', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        idservico: z.string(),
      })

      // Validar parâmetros da solicitação
      const { idservico } = paramsSchema.parse(request.params)

      // Converter o ID para número
      const id = parseInt(idservico)

      // Verificar se o ID é um número válido
      if (isNaN(id)) {
        throw new Error('O ID do servico deve ser um número válido.')
      }

      // Buscar o usuário no banco de dados
      const usercliente = await prisma.tiposServico.findUnique({
        where: {
          id,
        },
        include: {
          userEstabelecimento: true,
        },
      })

      // Verificar se o usuário foi encontrado
      if (!usercliente) {
        reply.code(404).send({ message: 'servico não encontrado.' })
      }

      // Enviar resposta com o usuário encontrado
      return reply.code(200).send(usercliente)
    } catch (error) {
      console.error('Erro ao buscar servico:', error)
      // Enviar resposta de erro com código 400
      reply.code(400).send({ message: 'Erro ao buscar servico.' })
    }
  })

  app.get('/tiposervicouser/:iduser', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        iduser: z.string(),
      })

      // Validar parâmetros da solicitação
      const { iduser } = paramsSchema.parse(request.params)

      // Converter o ID para número
      const userEstabelecimentoId = parseInt(iduser)

      // Verificar se o ID é um número válido
      if (isNaN(userEstabelecimentoId)) {
        throw new Error('O ID do usuario deve ser um número válido.')
      }

      // Buscar o usuário no banco de dados
      const usercliente = await prisma.tiposServico.findMany({
        where: {
          userEstabelecimentoId,
        },
      })

      // Verificar se o usuário foi encontrado
      if (!usercliente) {
        reply.code(404).send({ message: 'usuario não encontrado.' })
      }

      // Enviar resposta com o usuário encontrado
      return reply.code(200).send(usercliente)
    } catch (error) {
      console.error('Erro ao buscar servico:', error)
      // Enviar resposta de erro com código 400
      reply.code(400).send({ message: 'Erro ao buscar servico.' })
    }
  })

  app.post('/tiposervico', async (request, reply) => {
    try {
      // Validar o corpo da solicitação
      const bodySchema = z.object({
        name: z.string(),
        timeservice: z.string(),
        userEstabelecimentoId: z.number(),
      })
      const { name, timeservice, userEstabelecimentoId } = bodySchema.parse(
        request.body,
      )

      // Verificar se o usuário estabelecimento associado existe
      const userEstabelecimento = await prisma.userEstabelecimento.findUnique({
        where: {
          id: userEstabelecimentoId,
        },
      })
      if (!userEstabelecimento) {
        return reply
          .code(404)
          .send({ message: 'Usuário estabelecimento não encontrado.' })
      }

      // Criar um novo tipo de serviço associado ao usuário estabelecimento
      const newTipoServico = await prisma.tiposServico.create({
        data: {
          name,
          timeservice,
          userEstabelecimentoId,
        },
      })

      // Enviar resposta com o novo tipo de serviço criado
      return reply.code(201).send(newTipoServico)
    } catch (error) {
      console.error('Erro ao criar tipo de serviço:', error)
      // Enviar resposta de erro com código 400
      return reply.code(400).send({ message: 'Erro ao criar tipo de serviço.' })
    }
  })

  app.patch('/tiposervico/:idservico', async (request, reply) => {
    try {
      // Validar parâmetros da solicitação
      const paramsSchema = z.object({
        idservico: z.string(),
      })
      const { idservico } = paramsSchema.parse(request.params)

      // Converter o ID para número
      const id = parseInt(idservico)

      // Verificar se o ID é um número válido
      if (isNaN(id)) {
        throw new Error('O ID do servico deve ser um número válido.')
      }

      // Validar corpo da solicitação
      const bodySchema = z.object({
        name: z.string().optional(),
        timeservice: z.string().optional(),
      })
      const { name, timeservice } = bodySchema.parse(request.body)

      // Atualizar o usuário com base no ID fornecido
      const updatedUser = await prisma.tiposServico.update({
        where: {
          id,
        },
        data: {
          name,
          timeservice,
        },
      })

      // Verificar se o usuário foi atualizado com sucesso
      if (!updatedUser) {
        return reply.code(404).send({ message: 'Servico não encontrado.' })
      }

      // Enviar resposta com o usuário atualizado
      return reply.code(200).send(updatedUser)
    } catch (error) {
      console.error('Erro ao atualizar Servico:', error)
      // Enviar resposta de erro com código 400
      return reply.code(400).send({ message: 'Erro ao atualizar Servico.' })
    }
  })

  app.delete('/tiposervico/:idservico', async (request, reply) => {
    try {
      // Validar parâmetros da solicitação
      const paramsSchema = z.object({
        idservico: z.string(),
      })
      const { idservico } = paramsSchema.parse(request.params)

      // Converter o ID para número
      const id = parseInt(idservico)

      // Verificar se o ID é um número válido
      if (isNaN(id)) {
        throw new Error('O ID do servico deve ser um número válido.')
      }

      // Excluir o usuário com base no ID fornecido
      const deletedUser = await prisma.tiposServico.delete({
        where: {
          id,
        },
      })

      // Verificar se o usuário foi excluído com sucesso
      if (!deletedUser) {
        return reply.code(404).send({ message: 'Usuário não idservico.' })
      }

      // Enviar resposta com o usuário excluído
      return reply.code(200).send(deletedUser)
    } catch (error) {
      console.error('Erro ao excluir idservico:', error)
      // Enviar resposta de erro com código 400
      return reply.code(400).send({ message: 'Erro ao excluir idservico.' })
    }
  })
}
