module ViaCEP
  class Serializer
    def self.call(response)
      new(response).perform
    end

    def initialize(response)
      @response = response
    end

    def perform
      {
        failure: body[:erro] == "true",
        zipCode: body[:cep],
        streetName: body[:logradouro],
        district: body[:bairro],
        city: body[:localidade],
        state: body[:uf]
      }
    end

    private

    def body
      @body ||= JSON.parse(@response.body, symbolize_names: true)
    rescue JSON::ParserError
      {}
    end
  end
end
