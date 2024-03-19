import { Sequelize } from 'sequelize'

import EnvVars from '@src/constants/EnvVars'

const sequelize = new Sequelize(EnvVars.DB.URI)

export { sequelize }