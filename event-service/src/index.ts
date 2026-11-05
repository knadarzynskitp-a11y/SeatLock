import 'dotenv/config'
import app from './presentation/app.js'

const PORT = process.env.PORT || 3002;

app.listen(PORT , () => {
    console.log(`Server is running on port: ${PORT}`)
})