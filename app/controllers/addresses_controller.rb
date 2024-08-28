class AddressesController < ApplicationController
  layout false

  def show
    @address = ViaCEP::Client.call(params[:zip_code])

    respond_to do |format|
      format.html
      format.json { render json: @address }
    end
  end
end
