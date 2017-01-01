Rails.application.routes.draw do
  get 'home/index'

  root controller: :home, action: :index
end
