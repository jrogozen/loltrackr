Rails.application.routes.draw do

  root 'home#index'

  # riot api
  get "riotapi/champions" => "riotapi#get_champions"
  get "riotapi/champions-only" => "riotapi#get_riot_champions"
  get "riotapi/role" => "riotapi#get_role"
  get "riotapi/champion-by-id" => "riotapi#champion_by_id"
  get "riotapi/player-champion-stats" => "riotapi#player_champion_stats"
  get "riotapi/players" => "riotapi#player_by_id"

  get "teams/max-attack" => "teams#max_attack"
  get "teams/max-defense" => "teams#max_defense"

  get "categories" => "categories#index"

  resources :champions

  resources :teams

  get "videos/latest" => "videos#latest"
  
  resources :videos
  get "videos/:id/related/:filter" => "videos#find_related"
  get "videos/:video_id/plays" => "plays#index"
  get "videos/:video_id/plays/:id" => "plays#show"
  delete "videos/:vido_id/plays/:id" => "plays#destroy"
  post "videos/:video_id/plays" => "plays#create"

  get "search" => "search#show"

  # admin panel
  get "logout" => "sessions#destroy"
  post "login" => "sessions#create"
  get 'user' => "users#show"

  # twitch
  get "streams/all" => "twitch_api#index"
  get "streams" => "twitch_api#get_stream"
  get "streams/game_data" => "twitch_api#get_game_data"

  resources :sessions
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
