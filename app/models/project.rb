class Project < ApplicationRecord
  has_and_belongs_to_many :skills
  # has_many :domains, through: :skills

  def domains
    domains = Array.new()
    self.skills.each do |skill|
      unless domains.include? skill.domain
        domains << skill.domain
      end
    end
  end
end
