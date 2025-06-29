import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UpdateQuotaCodesTable extends BaseSchema {
  protected tableName = 'quota_codes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Supprimer la colonne `code`
      table.dropColumn('code')

      // Ajouter `user_id` avec clé étrangère
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .unique() // Un seul quota par utilisateur
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Supprimer `user_id`
      table.dropForeign(['user_id'])
      table.dropColumn('user_id')

      // Recréer la colonne `code`
      table.string('code', 6).notNullable().unique()
    })
  }
}
