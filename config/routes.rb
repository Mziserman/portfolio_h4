Rails.application.routes.draw do
  namespace :admin do
    resources :users
resources :domains
resources :offers
resources :projects
resources :skills

    root to: "users#index"
  end

  namespace :admin do
    resources :users
    resources :domains
    resources :projects
    resources :skills
    root to: "users#index"
  end

  devise_for :users
  namespace :admin do
    resources :projects

    root to: "projects#index"
  end

  get 'home/index'
  post '/create_offer' => 'home#create_offer'

  root controller: :home, action: :index
end
