require "net/http"

module ViaCEP
  class Client
    BASE_URL = "https://viacep.com.br/ws"

    def self.call(zip_code)
      new(zip_code).perform
    end

    def initialize(zip_code)
      @uri = URI("#{BASE_URL}/#{zip_code.to_s.delete('^0-9')}/json")
    end

    def perform
      Serializer.call(response)
    end

    private

    def response
      Net::HTTP.get_response(@uri)
    end
  end
end
