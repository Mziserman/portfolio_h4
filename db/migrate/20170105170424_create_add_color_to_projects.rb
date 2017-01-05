class AddColorToProjects < ActiveRecord::Migration[5.0]
  def change
    change_table :projects do |t|
      t.string :color

      t.timestamps
    end
  end
end
