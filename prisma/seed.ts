import bcrypt from 'bcrypt';
import { env } from '../src/config/env.js';
import { prisma } from '../src/config/db.js';

try {
	const passwordHash = await bcrypt.hash('LookeoTest2026!', env.BCRYPT_ROUNDS);
	
	const user = await prisma.user.upsert({
		where: {
			email: 'test@lookeo.com'
		},
		update: {
			name: 'Usuario Lookeo',
			passwordHash
		},
		create: {
			email: 'test@lookeo.com',
			name: 'Usuario Lookeo',
			passwordHash
		}
	});
	console.log("Usuario de prueba creado/actualizado: ", user.email);

	// --- NUEVO: Limpiamos prendas anteriores y creamos 4 de prueba ---
	await prisma.item.deleteMany({
		where: { userId: user.id }
	});

	const itemsDePrueba = [
		{
			type: 'Camisa',
			color: ['Blanco'],
			season: ['Entretiempo'],
			style: ['Casual'],
			imgUrl: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
			notes: 'Oxford de algodón. Corte regular y fácil de combinar.',
		},
		{
			type: 'Pantalón',
			color: ['Azul'],
			season: ['Invierno'],
			style: ['Formal'],
			imgUrl: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
			notes: 'Vaqueros rectos, perfectos para el día a día.',
		},
		{
			type: 'Zapatos',
			color: ['Negro'],
			season: ['Otoño'],
			style: ['Casual'],
			imgUrl: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'],
			notes: 'Sneakers de piel. Muy cómodos.',
		},
		{
			type: 'Abrigo',
			color: ['Marrón'],
			season: ['Invierno'],
			style: ['Formal'],
			imgUrl: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500'],
			notes: 'Abrigo largo de lana. Elegante para ocasiones especiales.',
		},
	];

	for (const item of itemsDePrueba) {
		await prisma.item.create({
			data: {
				...item,
				userId: user.id,
			},
		});
	}

	console.log(`Se han creado ${itemsDePrueba.length} prendas de prueba.`);

} catch (error) {
	console.error("Error al ejecutar el seed: ", error);
	process.exit(1);
} finally {
	await prisma.$disconnect();
}