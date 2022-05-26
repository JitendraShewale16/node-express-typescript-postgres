import Pool from './pg_pool'

class Schema {
  public static async handle(pool: Pool): Promise<void> {
    try {
      const client = await pool.connect()
      client.release()
    } catch (err) {
      err.text = err.toString()
      console.error(err)
    }
  }
}

export default Schema
