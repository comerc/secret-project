@feature-lists-subscribed
Feature: List Subscribed
  As a user
  In order to receive updates for a specific list
  I want to be able to subscribe and unsubscribe from the list

  Background:
    Given I am a registered user
    And I am logged in
    And I have a list with the name "Test List"
    And the list "Test List" is not subscribed

  @valid @smoke-test
  Scenario: Subscribe to a list
    When I subscribe to the list "Test List"
    Then I should be subscribed to the list
    And the list "Test List" should have my user ID in the subscribers list

  @valid @regression-test
  Scenario: Unsubscribe from a list
    When I unsubscribe from the list "Test List"
    Then I should not be subscribed to the list
    And the list "Test List" should not have my user ID in the subscribers list

  @invalid @regression-test
  Scenario: Subscribe to a list that does not exist
    When I subscribe to a non-existent list with the name "Nonexistent List"
    Then an error should be returned stating that the list does not exist

  @invalid @regression-test
  Scenario: Unsubscribe from a list that does not exist
    When I unsubscribe from a non-existent list with the name "Nonexistent List"
    Then an error should be returned stating that the list does not exist
