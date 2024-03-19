import { z } from 'zod'
/**
 * Environments variables declared here.
*/
/* eslint-disable node/no-process-env */

const envVariables = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  COOKIE_SECRET: z.string(),
  COOKIE_PATH: z.string(),
  COOKIE_EXP: z.string(),
  COOKIE_DOMAIN: z.string(),
  SECURE_COOKIE: z.union([z.literal('true'), z.literal('false')]),
  JWT_SECRET: z.string(),
  DB_URI: z.string()
})

envVariables.parse(process.env)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}

export default {
  NodeEnv: process.env.NODE_ENV,
  Port: process.env.PORT,
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: process.env.COOKIE_SECRET,
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH,
      maxAge: Number(process.env.COOKIE_EXP),
      domain: process.env.COOKIE_DOMAIN,
      secure: (process.env.SECURE_COOKIE === 'true')
    }
  },
  Jwt: {
    Secret: process.env.JWT_SECRET,
    Exp: process.env.COOKIE_EXP // exp at the same time as the cookie
  },
  DB: {
    URI: process.env.DB_URI
  }
} as const
