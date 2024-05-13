import zod from 'zod';

export const credentials = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const noteBody = zod.object({
    title: zod.string().min(1),
    content: zod.string().min(1)
})