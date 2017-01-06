class CreateOffers < ActiveRecord::Migration[5.0]
  def change
    create_table :offers do |t|
      t.string :title
      t.string :entreprise
      t.string :url
      t.text :message

      t.timestamps
    end
  end
end
