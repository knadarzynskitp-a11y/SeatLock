import "dotenv/config"
import app from '../presentation/app.js'

const PORT = Number(process.env.PORT || 3000);

const requiredEnv = [
    'PORT'
];

const missingEnv = requiredEnv.filter(
    name => !process.env[name]?.trim()
);

if (missingEnv.length > 0) {
    console.error(
        `Brak wymaganych zmiennych środowiskowych: ${missingEnv.join(', ')}`
    );

    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})