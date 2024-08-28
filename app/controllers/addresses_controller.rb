class AddressesController < ApplicationController
  def show
    address = ViaCEP::Client.call(params[:zip_code])

    render json: address
  end
end
