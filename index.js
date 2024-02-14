"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const appointments = [
    { time: "09:00", clientName: "Maria", service: "Corte de cabelo" },
    { time: "10:30", clientName: "João", service: "Barba" },
    { time: "13:00", clientName: "Ana", service: "Coloração" }
];
const app = (0, fastify_1.default)({ logger: true });
app.get('/api/appointments', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return appointments;
}));
app
    .listen({
    port: 8080,
    host: '0.0.0.0',
})
    .then(() => {
    console.log('🚀 Server Api rodando');
});
