Feature: weatherApp API testing

    Scenario: Validate that attempt to register a weather station without API Key will return error
        Given url for weatherApp is http://api.openweathermap.org/data/3.0/
        When I make a POST request to stations
        Then I try to register a weather station without API Key ""
        And I should get error message
    
    Scenario: Successfully register two stations
        Given url for weatherApp is http://api.openweathermap.org/data/3.0/
        When I make a POST request to stations
        Then I try to register a weather station With API Key EnterYourApiKeyHere
        And I try to register two stations and verify HTTP response code is 201
    
    Scenario: Using GET/stations verify that stations were successfully stored in DB
        Given url for weatherApp is http://api.openweathermap.org/data/3.0/
        When I make a POST request to stations
        Then I try to register a weather station With API Key EnterYourApiKeyHere
        And I should verify that data is stored successfully in DB and details are same
    


