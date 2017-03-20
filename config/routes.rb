Rails.application.routes.draw do
  # namespace :admin do
  #   resources :users
  #   resources :domains
  #   resources :offers
  #   resources :projects
  #   resources :skills

  #   root to: "users#index"
  # end

  devise_for :users
  post '/create_offer' => 'home#create_offer'

  root controller: :home, action: :index
end
