import fastify from 'fastify';

interface Appointment {
  time: string;
  clientName: string;
  service: string;
}

const appointments: Appointment[] = [
  { time: "09:00", clientName: "Maria", service: "Corte de cabelo" },
  { time: "10:30", clientName: "João", service: "Barba" },
  { time: "13:00", clientName: "Ana", service: "Coloração" },
  { time: "14:00", clientName: "Estevao", service: "Coloração" }
];

const app = fastify({ logger: true });

app.get('/api/appointments', async (request, reply) => {
  return appointments;
});

app
  .listen({
    port: 8080,
  })
  .then(() => {
    console.log('🚀 Server Api rodando')
  })