import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function agendaservicoRoutes(app: FastifyInstance) {
  app.get('/agendaservico', async (request, reply) => {
    try {
      const users = await prisma.agenda.findMany({
        include: {
          TipoServico: true,
          Estabelecimento: true,
          Recurso: true,
          Cliente: true,
        },
      })
      return reply.code(200).send(users)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      return reply.code(500).send({ message: 'Erro ao buscar usuários.' })
    }
  })

  app.get('/agendaservico/:idagenda', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        idagenda: z.string(),
      })

      // Validar parâmetros da solicitação
      const { idagenda } = paramsSchema.parse(request.params)

      // Converter o ID para número
      const id = parseInt(idagenda)

      // Verificar se o ID é um número válido
      if (isNaN(id)) {
        throw new Error('O ID da agenda deve ser um número válido.')
      }

      // Buscar o usuário no banco de dados
      const usercliente = await prisma.agenda.findUnique({
        where: {
          id,
        },
        include: {
          TipoServico: true,
          Estabelecimento: true,
          Recurso: true,
          Cliente: true,
        },
      })

      // Verificar se o usuário foi encontrado
      if (!usercliente) {
        reply.code(404).send({ message: 'Agenda não encontrado.' })
      }

      // Enviar resposta com o usuário encontrado
      return reply.code(200).send(usercliente)
    } catch (error) {
      console.error('Erro ao buscar Agenda:', error)
      // Enviar resposta de erro com código 400
      reply.code(400).send({ message: 'Erro ao buscar Agenda.' })
    }
  })

  app.post('/criaragendamento', async (request, reply) => {
    try {
      // Validar o corpo da solicitação
      const bodySchema = z.object({
        dia: z.number(), // Validar se é um email válido
        mes: z.number(),
        ano: z.number(),
        horario: z.string(),
        estabelecimentoId: z.number(),
        tipoServicoId: z.number(),
        clienteId: z.number(),
        recursoId: z.number(),
      })
      const {
        dia,
        mes,
        ano,
        horario,
        estabelecimentoId,
        tipoServicoId,
        clienteId,
        recursoId,
      } = bodySchema.parse(request.body)

      // Criar um novo usuário no banco de dados
      const newUser = await prisma.agenda.create({
        data: {
          dia,
          mes,
          ano,
          horario,
          estabelecimentoId,
          tipoServicoId,
          clienteId,
          recursoId,
        },
      })

      // Enviar resposta com o novo usuário criado
      return reply.code(201).send(newUser)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      // Enviar resposta de erro com código 400
      reply.code(400).send({ message: 'Erro ao criar usuário.' })
    }
  })
}
