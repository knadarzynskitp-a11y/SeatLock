import client from './redis.js'
import { rateLimit } from 'express-rate-limit'
import { RedisStore} from 'rate-limit-redis'

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
	limit: 10, 
	standardHeaders: true, 
	legacyHeaders: false, 
	store: new RedisStore({
		 prefix: 'rl:auth:',
		sendCommand: (...args: string[]) => client.sendCommand(args),
	}),
});

export const eventLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
	limit: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
	store: new RedisStore({
		 prefix: 'rl:event:',
		sendCommand: (...args: string[]) => client.sendCommand(args),
	}),
});