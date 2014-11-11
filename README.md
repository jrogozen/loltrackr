Loltrackr
=========================== 
Loltrackr is a Ruby on Rails/Angular web app designed to be a categorized database of video game (specifically, League of Legends) movies. Movies are taggable based on metrics such as time, players, and teams.

### Tech
  - Ruby on Rails
  - PostgreSQL
  - AngularJS
  - [Riot API](https://developer.riotgames.com/)
  - [Youtube Javascript Embed API](https://developers.google.com/youtube/js_api_reference)
  - Sass

## Table of Contents
  - [Introduction](#introductio)
  - [User Stories](#user-stories)
  - [Code Samples](#code-samples)
  - [To Do](#to-do)
  - [Contact](#contact)

## Introduction
Loltrackr combines my love of video games with my desire to create a functional web application that has some real world applicability. I started the project to explore Angular and Rails in a fun and interesting way. Along the way I gained experience working with different APIs (Riot, Youtube), User Authentication, and core software engineering principles such as Separation of Concerns, Single Responsibility, and Big O Notation. I plan to continue this project and incorporate new tech (Node.js) and new APIs (Twitch.tv).

## User Stories
  - Import videos from Youtube based off of ID
  - Tag videos with players, champions, and teams
  - Champions should be pulled from Riot's API to ensure only valid champion tags can be added
  - Videos are searchable based on any of their tags/title
  - "Plays" can be added to each Video which correlate to a specific time/event in the Video
  - Related Videos should show up in each Video view when applicable
  - Logged in Administrator has a web interface to delete Videos/Plays

## Code Samples
  Truncated code snippets from files in app. For full view of file, please navigate to the github page.

### Separation of concerns between Video Controller, Video Factory, and Youtube Factory
  When first building out the Video controller, I separated my API and server calls into a Video Factory. However, I kept most of my data manipulation in the controller. To separate my concerns and make the code more modular, I moved that logic into the Video Factory. Once I integrated the Youtube embedded player API, having only one controller and one model seemed messy and illogical. I created a Youtube model and moved all of the Youtube player settings from the controller to there. I also created setup functions in both models that are called in the controller. The setup functions handle instantiation logic. To improve the code in the future, I would remove the need for most of the $scope variables in the controller. Instead, I would use ng-repeat in my HTML to iterate over a specific key in the factory's returned model object. 
  - Moved logic from controller to video and youtube models (factories)
  - Controller doesn't care how the model handles its tasks
  - Grouped initialization logic in models into setup function, which is called in the controller
  - Store variable logic (show/hide divs) in models rather than controller
  - Named functions in model are set to ngResource so results can be cached (no need for a new query everytime)

#### app/assets/javascripts/angular/controllers/view-video-controller.js
````js
// initialize Youtube player settings and load Video models
Youtube.setup($routeParams.id);
Video.setup($routeParams.id);

/* set scopes. 
look into bypassing this and referencing 
models.modelName directly in HTML for easier data binding */
$scope.video = Youtube.models.video;
$scope.settings = Video.settings;
$scope.youtubeSettings = Youtube.youtubeSettings;
$scope.plays = Video.models.plays;

// scope for related videos
$scope.getRelatedByPlayer = Video.models.relatedByPlayer;
$scope.getRelatedByChampion = Video.models.relatedByChampion;

$scope.startAddPlay = function() {
  Video.settings.playForm = true;
}

$scope.sendTime = function(time) {
  Youtube.changeTime(time);
  // scroll to top of page(video) when play is clicked
  anchorSmoothScroll.scrollTo('video');
};
````

#### app/assets/javascripts/angular/models/video-model.js
````js
// object that holds what will later be turned into scope variables in controller
var models = {};

var fetch = $resource('videos/:id', {id: '@id'}, {

});

var findRelated = $resource('videos/:id/related/:filter', {id: '@id'}, {
  get: {
    isArray: true
  }
});

var play = $resource('videos/:video_id/plays/:id', {video_id: '@video_id', id: '@id'}, {
  query: {
    isArray: false
  }
})

var setup = function(videoId) {
  // grab related videos and plays
  models.relatedByPlayer = findRelated.get({id: videoId, filter: 'player'});
  models.relatedByChampion = findRelated.get({id: videoId, filter: 'champion'});
  models.plays = play.query({video_id: videoId});

  // handle display or related video view
  models.relatedByPlayer.$promise.then(function(data){
    settings.relatedPlayer = !!data[0];
  });

  models.relatedByChampion.$promise.then(function(data) {
    settings.relatedChampion = !!data[0];
  });
}

var settings = {
  relatedPlayer: false,
  relatedChampion: false,
  playForm: false,
  videoLoaded: false
}

return {
  setup: setup,
  settings: settings,
  fetch: fetch,
  models: models,
  findRelated: findRelated,
  addPlay: addPlay,
  play: play
}
````

#### app/assets/javascripts/angular/models/youtube-factory.js
````js
var youtubeSettings = {
  width: 600,
  height: 480,
  time: 0
};

var setup = function(videoId) {
  models.video = Video.fetch.get({id: videoId});
 
  models.video.$promise.then(function(data) {
    youtubeSettings.videoid = data.info.youtube_id;
    Video.settings.videoLoaded = true;
  });
};

var changeTime = function(time) {
  var minutes = parseInt(time["minutes"]);
  var seconds = parseInt(time["seconds"]);

  if (!minutes) {
    minutes = 0;
  }

  youtubeSettings.time = (minutes * 60) + seconds;
};

return {
  setup: setup,
  youtubeSettings: youtubeSettings,
  models: models,
  changeTime: changeTime
};
````

### User Authentication / Session Creation
  In the future I'd like to find a way to remove the need for a $route.reload(); when a user logs in. The code currently forces a $route.reload(); so that the current user check runs again after a controller reload. One way I might be able to solve this is to utilize a $scope.$watch() to check if a value in the scope has changed (and then set the current user).
  - Ruby sessions controller handles the actual creation and destruction of a session based on params sent through route
  - Application controller stores session related methods that will be used throughout the Ruby side of the app (current user, logged in?)
  - User login/logout logic is abstracted away from the Admin controller and stored in a user model (factory)
  - User model's ngResource function sends HTTP requests to Rails routes, which create and return a new session
  - Current user is set (if exists) on Angular controller load

#### app/controllers/sessions_controller.rb

````ruby
  def create
    if params[:email]
      user = User.authenticate(params[:email], params[:password])
      log_in_user(user)
      render json: current_user
    end
  end

  def destroy
    log_out_user
    redirect_to "/", notice: "You've been logged out."
  end
````

#### app/controllers/application_controller.rb

````ruby
  def current_user  
    return User.find_by(id: session[:user_id]) if session[:user_id]
    return nil
  end

  def is_logged_in?
    !session[:user_id].nil?
  end

  def log_in_user(user)
    session[:user_id] = user.id
  end

  def log_out_user
    session.delete :user_id
  end
````

#### app/assets/javascripts/anguar/models/user-model.js

````js
  var userResource = $resource('/user', {}, {
  });

  // model object holds user data that will be used in controller
  var models = {}

  // ngResource that creates and deletes rails sessions
  var sessionResource = $resource('/sessions', {}, {
    create: {
      method: 'post',
      url: 'login',
    },
    destroy: {
      method: 'get',
      url: 'logout'
    }
  });

  var login = function(user) {
    sessionResource.create(user).$promise.then(function() {
      settings.loggedIn = true;
      $route.reload();
    });
  }

  var currentUser = function() {
    models.user = userResource.get();
    models.user.$promise.then(function(data) {
      // check to see if the user has an id (exists)
      if (models.user.id) {
        // toggle settings to display different divs in view
        settings.loggedIn = true;
      }
    });
  };

  return {
    login: login,
    logout: logout,
    setup: setup,
    settings: settings,
    models: models
  }
````

#### app/assets/javascripts/angular/controllers/admin-controller.js

````js
  // check to see if there's a current user
  User.setup();

  // create two way data bindings
  $scope.currentUser = User.models.user
  $scope.settings = User.settings

  $scope.authUser = function(user) {
    User.login(user);
  }

  $scope.logOut = function() {
    User.logout();
  }

  $scope.delete = function(video) {
    video.$delete();
    $route.reload();
  }
````

## To Do
  - Incorporate Twitch API to showcase live streams
  - Stream VODs can have Plays added to them on the fly and saved to the database
  - Pull Relevant Game Statistics from VODS when saving (based off Riot API)
  - Show Champion statistics in Video view (based off Riot API)
  - Ability to report Videos/Plays to Administrator
  - User authentication and user owned Videos

## Contact
I'm always looking for suggestions and feedback! You can find me on [github](http://github.com/jrogozen), [twitter](http://twitter.com/jonrogozen), [linkedIn](https://www.linkedin.com/in/jonrogozen), or my [portfolio page](http://jrogozen.com). You can find Loltrackr [here](http://loltrackr.com)

