class AddSlugToPredicatesTable < ActiveRecord::Migration[6.0]
  def change
    change_table :predicates do |t|
      t.string :slug
    end
  end
end
