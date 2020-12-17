class CreateBrowserRules < ActiveRecord::Migration[6.0]
  def change
    create_table :browser_rules do |t|
      t.string :language
      t.string :variant
      t.string :new_url
      t.references :smart_link, null: false, foreign_key: true

      t.timestamps
    end
  end
end
