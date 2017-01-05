class Skill < ApplicationRecord
  belongs_to :domain
  has_and_belongs_to_many :projects
end
