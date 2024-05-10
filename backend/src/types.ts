import zod from 'zod';

export const credentials = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})
