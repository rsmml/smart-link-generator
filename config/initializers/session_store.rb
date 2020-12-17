if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: "_smart-link-generator", domain: 'smart-link-generator.'
end
