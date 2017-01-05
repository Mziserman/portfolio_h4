class CreateAddColorToProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :add_color_to_projects do |t|
      t.string :color

      t.timestamps
    end
  end
end
