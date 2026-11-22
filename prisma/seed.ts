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
	console.log("Usuario de prueba creado/actualizado: ", user.email)
} catch (error) {
	console.error("Error al ejecutar el seed: ", error);
	process.exit(1);
} finally {
	await prisma.$disconnect();
}
