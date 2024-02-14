import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { RouteHandlerMethod } from 'fastify/types/route'

interface Appointment {
  dia: string
  mes: string
  time: string
  clientName: string
  service: string
}

const appointments: Appointment[] = [
  {
    dia: '14',
    mes: '2',
    time: '09:00',
    clientName: 'Maria',
    service: 'Corte de cabelo',
  },
  { dia: '14', mes: '2', time: '10:30', clientName: 'João', service: 'Barba' },
  {
    dia: '14',
    mes: '2',
    time: '13:00',
    clientName: 'Ana',
    service: 'Coloração',
  },
  {
    dia: '14',
    mes: '2',
    time: '14:00',
    clientName: 'Estevao',
    service: 'Coloração',
  },
  { dia: '14', mes: '2', time: '18:00', clientName: 'Yuri', service: 'Corte' },
  {
    dia: '15',
    mes: '2',
    time: '15:00',
    clientName: 'José',
    service: 'Corte e Barba',
  },
]

const app: FastifyInstance = fastify({ logger: true })

const options: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      properties: {
        dia: { type: 'string' },
        mes: { type: 'string' },
      },
    },
  },
}

const getAppointmentsHandler: RouteHandlerMethod = async (request, reply) => {
  try {
    const { dia, mes } = request.params as { dia: string; mes: string }
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.dia === dia && appointment.mes === mes,
    )
    return filteredAppointments
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' })
  }
}

app.get('/api/appointments/:dia/:mes', options, getAppointmentsHandler)

app
  .listen({
    port: 8080,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Server Api rodando')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })