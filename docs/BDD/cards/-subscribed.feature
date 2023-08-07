@feature-cards-subscribed
Feature: Card Subscribed
  As a user
  In order to receive updates for a specific card
  I want to be able to subscribe and unsubscribe from the card

  Background:
    Given I am a registered user
    And I am logged in
    And I have a card with the name "Test Card"
    And the card "Test Card" is not subscribed

  @valid @smoke-test
  Scenario: Subscribe to a card
    When I subscribe to the card "Test Card"
    Then I should be subscribed to the card
    And the card "Test Card" should have my user ID in the subscribers card

  @valid @regression-test
  Scenario: Unsubscribe from a card
    When I unsubscribe from the card "Test Card"
    Then I should not be subscribed to the card
    And the card "Test Card" should not have my user ID in the subscribers card

  @invalid @regression-test
  Scenario: Subscribe to a card that does not exist
    When I subscribe to a non-existent card with the name "Nonexistent Card"
    Then an error should be returned stating that the card does not exist

  @invalid @regression-test
  Scenario: Unsubscribe from a card that does not exist
    When I unsubscribe from a non-existent card with the name "Nonexistent Card"
    Then an error should be returned stating that the card does not exist
