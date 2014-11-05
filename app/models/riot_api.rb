class RiotApi < ActiveRecord::Base
  def self.integrate_data(champion_data)
    if champion_data.nil?
      return
    end

    champions = []

    # local_champs = {}
    # Champion.all.each do |champ|
    #   local_champs[champ.name] = champ
    # end

    champion_data.each do |champ, data|
      local_champ = Champion.find_by(name: data["name"])

      if local_champ
        champion_data[champ]["role"] = local_champ.role.split(";").map {|x| x.capitalize}
      end

      champions << data
    end

    champions
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
end
