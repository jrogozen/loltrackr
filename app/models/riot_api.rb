class RiotApi < ActiveRecord::Base
  def self.integrate_data(champion_data)
    if champion_data.nil?
      return
    end

    local_champions = Champion.all

    champion_data.each do |champ, data|
      local_champions.each do |l_champ, index|
        if champ == l_champ.name
          champion_data[champ]["role"] = l_champ.role.split(";").map {|x| x.capitalize}
        end
      end
    end
    champion_data
  end

  def self.only_champions(champion_data)
    champions = []
    champion_data.each do |champ, data|
      champions << data
    end
    champions
  end

  def self.show_matching_roles(champion_data)
    selected_champions = []

    champion_data.each do |champ, data|

      local_champ = Champion.where('role LIKE?', '%' + params["q"] + '%').find_by(name: data["name"])

      if local_champ
        champion_data[champ]["role"] = local_champ.role.split(";")
        selected_champions << data
      end
    end

    selected_champions
  end

  def self.filter_champion(response, championId)
    return response["champions"].select {|champ| champ["id"].to_i == championId.to_i}[0]
  end
end
