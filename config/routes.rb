Rails.application.routes.draw do
  devise_for :users
  namespace :admin do
    resources :projects

    root to: "projects#index"
  end

  get 'home/index'

  root controller: :home, action: :index
end
